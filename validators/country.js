const { check } = require("express-validator");
exports.addcountryValidator = [
  check("name").not().isEmpty().withMessage("Le nom est requis"),
];

exports.deletePhotolValidator = [
  check("imageID").not().isEmpty().withMessage("  image est  requise "),
  check("pictureUrl").not().isEmpty().withMessage("  image url est  requis"),
  check("id").not().isEmpty().withMessage("  id pays est  requis "),
];

exports.updateCountryValidator = [
  check("id").not().isEmpty().withMessage("ID est  requis "),
];
