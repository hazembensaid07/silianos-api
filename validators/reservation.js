const { check } = require("express-validator");

exports.addReservationValidator = [
  check("name").not().isEmpty().withMessage("Le nom de voyage est requis"),
  check("prenom").not().isEmpty().withMessage("Le prenom est requis"),
  check("telephone").not().isEmpty().withMessage("Le telephone est requis"),
  check("cin").not().isEmpty().withMessage("Le cin est requis"),
  check("occupants").not().isEmpty().withMessage("L'occupants est requis"),
  check("price").not().isEmpty().withMessage("Le prix est requis"),
  check("date").not().isEmpty().withMessage("La date est requis"),
  check("nom").not().isEmpty().withMessage("Le nom est requis"),
];

exports.updateReservationValidator = [
  check("id").not().isEmpty().withMessage("L'id est requis"),
];
