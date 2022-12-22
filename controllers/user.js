const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendEmailWithNodemailer } = require("../helpers/email");
//a package offering many useful j functionalities
const _ = require("lodash");

//signup controller
exports.signup = (req, res) => {
  //destructuring the req.body object
  const { name, lastName, email, password } = req.body;

  // checking if the email is used by another account
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    // creating the user token
    const requestAdmin = false;
    const token = jwt.sign(
      { name, lastName, email, password, requestAdmin },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "7d" }
    );
    // activation email that will be sent to the user
    const emailData = {
      from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: req.body.email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "Acitivation du compte ",
      html: `
                <h1>Cliquez sur le lien vpour valider votre compte </h1>
                 <p>http://0.0.0.0:3000/activate/${token}</p>
                <hr />
                <p>Cet Email contient des informations importantes</p>
               
            `,
    };

    sendEmailWithNodemailer(req, res, emailData);
  });
};

//acoount activation controller
exports.accountActivation = (req, res) => {
  const { token } = req.body;
  if (token) {
    //verifying the token using jwt insert a call back function in verify
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }
        //decoding the token to get the user parameters
        const { name, lastName, email, password, requestAdmin } =
          jwt.decode(token);
        //creating a new user object (the password will be hashed in this phase using the functions declared int he user Schema)
        const user = new User({
          name,
          lastName,
          email,
          password,
          requestAdmin,
        });
        // saving the user to the DB
        user.save((err, user) => {
          return res.json({
            message: "Signup success. Please signin.",
            token: token,
          });
        });
        console.log("ddd");
      }
    );
  } else {
    return res.status(400).json({
      message: "Something went wrong. Try again.",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  User.findOne({ email })
    .select("+hashed_password")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup",
        });
      }
      // authenticate to check if the email and the password matches
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Email and password do not match",
        });
      }

      // generate a token and send to client
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { email, name, lastName, role } = user;

      return res.json({
        token,
        user: { email, name, lastName, role },
      });
    });
};

//forgot password controller
exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  //verify that the user exists or not
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }

    //signing the token
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Changement du Mot de passe `,
      html: `
                <h1>Cliquez sur ce lien pour modilfier votre mot de passe </h1>
                <p>http://0.0.0.0:3000/resetpassword/${token}</p>
             
                <hr />
              <p>Cet Email contient des informations importantes</p>
                <p></p>
            `,
    };
    sendEmailWithNodemailer(req, res, emailData);
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {});
  });
};
//reset password controller
exports.resetPassword = (req, res) => {
  //resetPasswordLink token for the reset password operation
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    //verifiying the reset password Link
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: "Expired link. Try again",
          });
        }
        //finding the user
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong. Try later",
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };
          //use loadach method extend to update the user object
          user = _.extend(user, updatedFields);
          //saving the user
          user.save((err, result) => {
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};
exports.loadUser = async (req, res) => {
  const { name, lastName, email, role } = req.user;
  const user = { name, lastName, email, role };
  res.status(200).send({ msg: "load user  succ", user: user });
};
exports.requestAdmin = async (req, res) => {
  try {
    //user send a request to become admin because the management of the admin panel is like bellow: the first user created (the manager of the agency) will have admin role by changing it manually in the database then to promote another user as admin he sends a request and the manager either accept either deny
    const { email } = req.body;
    User.findOne({ email }, async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist",
        });
      }
      const result = await User.updateOne(
        { email: email },
        { $set: { requestAdmin: true } }
      );
      res.status(200).json({
        msg: "Request added with success",
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: "internal server error ",
    });
  }
};

exports.assignAdmin = async (req, res) => {
  try {
    //id user
    const { _id } = req.body;
    User.findOne({ _id }, async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist",
        });
      }

      const result = await User.updateOne(
        { _id: _id },
        { $set: { requestAdmin: false, role: "admin" } }
      );

      res.status(200).json({
        message: "Admin Added",
      });
    });
  } catch (error) {
    res.status(403).json({
      error: "internal server error ",
    });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    //id user
    const { _id } = req.body;
    User.findOne({ _id }, async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist",
        });
      }

      const result = await User.updateOne(
        { _id: _id },
        { $set: { requestAdmin: false } }
      );
      res.status(200).json({
        message: "Request Deteleted With Success",
      });
    });
  } catch (error) {
    res.status(403).json({
      error: "internal server error ",
    });
  }
};
//get admin requests which is admin protected route
exports.getRequests = async (req, res) => {
  try {
    const result = await User.find({ requestAdmin: true }).sort({ _id: -1 });

    res.send({
      message: "requests found",
      result,
    });
  } catch (error) {
    res.status(500).send({ error: "internal server error " });
  }
};
