const { check } = require("express-validator");
exports.addOrgValidator = [
  check("destination").not().isEmpty().withMessage("Destination needed"),
  check("description").not().isEmpty().withMessage("description needed"),
  check("programme").not().isEmpty().withMessage("programme needed"),
  check("metadescription")
    .not()
    .isEmpty()
    .withMessage(" meta_description est  requis "),
  check("metatitle").not().isEmpty().withMessage(" meta_title  est  requis "),
  check("metakeywords.*")
    .not()
    .isEmpty()
    .withMessage(" meta_keywords  est  requis "),
  check("price")
    .isArray({ min: 1 })
    .withMessage("Il faut ajouter les prix et les dates "),
  check("price.*.date")
    .not()
    .isEmpty()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("la date est requise "),
  check("price.*.date").not().isEmpty().withMessage("le prix est requise "),
];

exports.updateOrgValidator = [
  check("id").not().isEmpty().withMessage("ID is needed "),
];

exports.loadalOrgValidator = [
  check("page").not().isEmpty().withMessage("le numéro de page  est  requis "),
];

exports.deletePhotolValidator = [
  check("imageID").not().isEmpty().withMessage(" image est requise "),
  check("pictureUrl").not().isEmpty().withMessage(" image url est  requis"),
  check("id").not().isEmpty().withMessage(" id hotel est  requis "),
];

exports.searchOrgValidator = [
  check("search").not().isEmpty().withMessage(" la destination est requis "),
];
