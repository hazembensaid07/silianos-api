const express = require("express");
const router = express.Router();
const {
  signup,
  accountActivation,
  signin,
  forgotPassword,
  resetPassword,
  assignAdmin,
  requestAdmin,
  getRequests,
  loadUser,
  deleteAdmin,
} = require("../controllers/user");
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  userUpdateValidator,
} = require("../validators/user");
const {
  admin,
  isAuth,
  adminReq,
  adminReqHandler,
} = require("../middleware/signIn");

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/account-activation", accountActivation);

router.post("/signin", userSigninValidator, runValidation, signin);

router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);

router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

router.post(
  "/request-role",
  adminReq,
  forgotPasswordValidator,
  runValidation,
  requestAdmin
);

router.post("/add-admin", adminReqHandler, assignAdmin);
router.post("/delete-admin", adminReqHandler, deleteAdmin);
router.get("/get-request", adminReqHandler, getRequests);
router.get("/profile", isAuth, loadUser);

module.exports = router;
