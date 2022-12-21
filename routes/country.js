const express = require("express");
const router = express.Router();
const {
  getByName,
  addCountry,
  addImage,
  deletePhoto,
  deleteCountry,
  updateCountry,
} = require("../controllers/country");
const { admin, isAuth } = require("../middleware/signIn");
const {
  addcountryValidator,
  deletePhotolValidator,
  searchCountryValidator,
  updateCountryValidator,
} = require("../validators/country");
const { runValidation } = require("../validators");
const { admin } = require("../middleware/signIn");
router.post(
  "/country/add",
  admin,
  addcountryValidator,
  runValidation,
  addCountry
);
router.post(
  "/country/update",
  admin,
  updateCountryValidator,
  runValidation,
  updateCountry
);
router.post("/country/image", admin, addImage);
router.delete(
  "/country/image",
  admin,
  deletePhotolValidator,

  runValidation,
  deletePhoto
);
router.delete("/country/delete/:id", admin, deleteCountry);
router.get("/country", getByName);
module.exports = router;
