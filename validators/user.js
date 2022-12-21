const { check } = require("express-validator");
//verify automatically the req.body
//validate the sign up form of the user
exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("lastName").not().isEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
//validate the signin form of the user
exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
//validate the email int forgot password form
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];
exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
exports.userUpdateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("lastname").not().isEmpty().withMessage("Name is required"),
];
