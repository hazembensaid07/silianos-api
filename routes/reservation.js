const express = require("express");
const router = express.Router();
const {
  addReservation,
  deleteReservation,
  updateReservation,
  getByName,

  getById,
  checkTrue,
  getByChecked,
} = require("../controllers/reservation");
const {
  addReservationValidator,
  updateReservationValidator,
} = require("../validators/reservation");
const { runValidation } = require("../validators");
const { admin } = require("../middleware/signIn");

router.post(
  "/reservation/add",
  addReservationValidator,
  runValidation,
  addReservation
);
router.post(
  "/reservation/update",
  updateReservationValidator,
  runValidation,
  updateReservation
);
router.delete("/reservation/delete/:id", deleteReservation);
router.get("/reservation/search", getByName);
router.get("/reservation/:id", getById);
router.get("/reservation/filter/check", getByChecked);
router.post("/reservation/check", checkTrue);
module.exports = router;
