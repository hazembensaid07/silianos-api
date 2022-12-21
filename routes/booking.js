const express = require("express");
const router = express.Router();
const {
  getBooking,
  filterByStars,
  filterByBestHotel,
  sortHotelsByPrice,
  addVoucher,
  getAllVouchers,
  ValidateVocuherAgency,
  ValidateVoucherAgency,
  ValidateHotelPaiement,
  loadPaidVoucher,
  loadUnPaidVoucher,
  deleteVoucher,
  loadVoucher,
  loadPaidVoucherByHotel,
  loadUnPaidVoucherByHotel,
  getVouchersByHotel,
  getBookingbyHotel,
  ValidateVocuherAgencyAccompte,
  ValidateVoucherAgencyAccompte,
} = require("../controllers/booking");
const {
  addBookingValidator,
  filterBookingValidator,
  sortBookingValidator,
  addVoucherValidator,
} = require("../validators/booking");
const { runValidation } = require("../validators");
const { admin } = require("../middleware/signIn");

router.post("/booking/add", addBookingValidator, runValidation, getBooking);
router.post(
  "/booking/add/byhotel",
  addBookingValidator,
  runValidation,
  getBookingbyHotel
);
router.post(
  "/booking/filter/stars",
  filterBookingValidator,
  runValidation,
  filterByStars
);

router.post("/booking/filter/best", filterByBestHotel);
router.post(
  "/booking/sort",
  sortBookingValidator,
  runValidation,
  sortHotelsByPrice
);
router.post("/voucher/add", addVoucherValidator, runValidation, addVoucher);
router.post("/voucher/validate-agency", admin, ValidateVoucherAgency);
router.post(
  "/voucher/validate-acoompte-agency",
  admin,
  ValidateVoucherAgencyAccompte
);
router.post("/voucher/validate-hotel", admin, ValidateHotelPaiement);
router.get("/voucher/all", admin, getAllVouchers);
router.get("/voucher/paid", admin, loadPaidVoucher);
router.get("/voucher/unpaid", admin, loadUnPaidVoucher);
router.get("/voucher/one/:id", admin, loadVoucher);
router.delete("/voucher/delete/:id", admin, deleteVoucher);
router.get("/voucher/byhotel/all", admin, getVouchersByHotel);
router.get("/voucher/byhotel/paid", admin, loadPaidVoucherByHotel);
router.get("/voucher/byhotel/unpaid", admin, loadUnPaidVoucherByHotel);
module.exports = router;
