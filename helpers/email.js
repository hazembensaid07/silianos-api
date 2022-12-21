const nodeMailer = require("nodemailer");
exports.sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "mail.gandi.net",
    port: 465,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASSWORD,
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      return res.status(200).json({
        message: `Email has been sent to your email. Follow the instruction `,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ message: "server error" });
    });
};

exports.sendEmailWithForVoucher = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "mail.gandi.net",
    port: 465,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASSWORD,
    },
  });

  return transport
    .sendMail(emailData)
    .then((info) => {
      console.log("okay");
    })
    .catch((err) => console.log(err.message));
};
