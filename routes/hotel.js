const express = require("express");
const router = express.Router();
const {
  addHotel,
  updateHotel,
  deleteHotel,
  loadAllHotels,
  loadHotel,
  searchHotel,
  getHotelsName,
  loadBestHotels,
  loadDiscountHotels,
  deletePhoto,
  loadBestHotelsFive,
  loadDiscountHotelsFive,
  loadActiveHotels,
  loadDisabledHotels,
  loadStatistics,
  addHoteldata,
} = require("../controllers/hotel");
const {
  addhotelValidator,
  updatehotelValidator,
  loadallhotelsValidator,
  searchHotelValidator,
  deletePhotolValidator,
} = require("../validators/hotel");
const { runValidation } = require("../validators");
const upload = require("../helpers/multer");
const { admin, isAuth } = require("../middleware/signIn");

router.post("/hotel/add-files", admin, addHotel);

router.post(
  "/hotel/add",
  admin,
  addhotelValidator,
  runValidation,
  addHoteldata
);

router.get(
  "/hotel/all",

  loadAllHotels
);
router.get(
  "/hotel/active/all",
  admin,
  loadallhotelsValidator,
  runValidation,
  loadActiveHotels
);
router.get(
  "/hotel/disable/all",
  admin,
  loadallhotelsValidator,
  runValidation,
  loadDisabledHotels
);
router.get(
  "/hotel/statistics",
  admin,

  loadStatistics
);

router.get("/hotel/one/:id", updatehotelValidator, runValidation, loadHotel);
router.get(
  "/hotel/name/all",
  searchHotelValidator,
  runValidation,
  getHotelsName
);

router.post(
  "/hotel/update",
  admin,
  addhotelValidator,
  runValidation,
  updateHotel
);
router.delete(
  "/hotel/delete/:id",
  admin,
  updatehotelValidator,
  runValidation,
  deleteHotel
);
router.get("/hotel/best/all", loadBestHotels);

router.get("/hotel/best/five", loadBestHotelsFive);
router.get("/hotel/discount/all", loadDiscountHotels);

router.get("/hotel/discount/five", loadDiscountHotelsFive);

router.get(
  "/hotel/search/filter",
  admin,
  searchHotelValidator,
  runValidation,
  searchHotel
);

router.post(
  "/hotel/remove/photo",
  admin,
  deletePhotolValidator,
  runValidation,
  deletePhoto
);

router.delete(
  "/hotel/delete/:id",
  updatehotelValidator,
  runValidation,
  deleteHotel
);

module.exports = router;
