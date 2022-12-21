const express = require("express");
const {
  addOrg,
  deleteOrg,
  deletePhoto,
  updateOrg,
  getAllOrg,
  getOrgById,
  loadBestTrips,
  loadBestTripsAll,
  getOrgByDestination,
  getAll,
  addImage,
} = require("../controllers/org");
const { admin } = require("../middleware/signIn");
const {
  addOrgValidator,
  updateOrgValidator,
  loadalOrgValidator,
  deletePhotolValidator,
  searchOrgValidator,
} = require("../validators/org");
const { runValidation } = require("../validators");

const router = express.Router();

router.post("/add", addOrgValidator, runValidation, addOrg);
router.post("/add/image", admin, addImage);
router.get("/all/orgs", getAll);

router.get("/:id", getOrgById);

router.delete("/:id", admin, updateOrgValidator, runValidation, deleteOrg);

router.post("/image", admin, deletePhotolValidator, runValidation, deletePhoto);

router.get("/", loadalOrgValidator, runValidation, getAllOrg);
router.post("/update", admin, addOrgValidator, runValidation, updateOrg);

router.get("/trip/best", loadBestTrips);
router.get("/trip/best/all", loadBestTripsAll);

router.get(
  "/trip/destination",
  searchOrgValidator,
  runValidation,
  getOrgByDestination
);

module.exports = router;
