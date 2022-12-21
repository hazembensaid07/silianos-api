const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-hashed_password");

    // send not authorisation IF NOT USER
    if (!user) {
      return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
    }

    // if user exist
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
};

// admin access
exports.admin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-hashed_password");

    // send not authorisation IF NOT USER
    if (!user) {
      return res.status(401).send({ error: [{ msg: "Unauthorized" }] });
    }
    if (user.role !== "admin") {
      return res.status(401).send({ errors: [{ msg: "Unauthorized" }] });
    }

    // if user exist
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
};
// Control who can send request to become admins
exports.adminReq = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];

    // if the token is undefined =>
    if (!token) {
      return res.status(400).send({ error: "Unauthorized" });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // search the user
    const user = await User.findById(decoded._id).select("-hashed_password");

    if (user.role === "admin") {
      return res
        .status(400)
        .send({ error: "Forbidden user is already an admin" });
    }

    if (user.requestAdmin) {
      return res
        .status(403)
        .send({ error: "Forbidden user already sent a request" });
    }

    // if user validates conditions
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ error: "something went wrong try later" });
  }
};

// Control who can manage the admin role requests
exports.adminReqHandler = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];

    // if the token is undefined =>
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // search the user
    const user = await User.findById(decoded._id).select("-hashed_password");

    // send not authorisation IF NOT admin
    if (user.email != "hazembensaid195@gmail.com") {
      return res.status(401).send({ errors: [{ msg: "unauthorized" }] });
    }

    // if user validates conditions
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ errors: [{ msg: "something went wrong try later" }] });
  }
};
