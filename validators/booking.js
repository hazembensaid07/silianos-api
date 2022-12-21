const { check } = require("express-validator");
exports.addBookingValidator = [
  check("nombres_nuits")
    .isFloat({ min: 1 })
    .withMessage("Nombres des nuits  est  requis "),
  check("rooms.*.nombres_adultes")
    .isFloat({ min: 0 })
    .withMessage("Nombres des adultes   est  requis "),
  check("rooms.*.nombre_enfants2ans")
    .isFloat({ min: 0 })
    .withMessage("Nombres des enfants moins 2 ans  est  requis "),
  check("rooms.*.nombre_enfants12ans")
    .isFloat({ min: 0 })
    .withMessage("Nombres des enfants moins 12 ans  est  requis "),
];
exports.filterBookingValidator = [
  check("stars")
    .isFloat({ min: 1 })
    .withMessage("Nombre des étoiles   est  requis "),
];
exports.sortBookingValidator = [
  check("tri").isFloat({ min: 1 }).withMessage("Critère de tri   est  requis "),
];
exports.addVoucherValidator = [
  check("nuits")
    .isFloat({ min: 1 })
    .withMessage("Nombres des nuits  est  requis min 1 "),
  check("price")
    .isFloat({ min: 1 })
    .withMessage("Le prix de résrvation est  requis "),
  check("paidAgency").isBoolean().withMessage("paidAgency  est  requis "),
  check("tel").not().isEmpty().withMessage("tel  est  requis "),
  check("logement")
    .not()
    .isEmpty()
    .withMessage("le type de logement   est  requis "),
  check("nomHotel").not().isEmpty().withMessage("le  nomHotel   est  requis "),
  check("arrive")
    .not()
    .isEmpty()
    .withMessage("la date_arrivée   est  requise "),
  check("dateD").not().isEmpty().withMessage("la date_départ   est  requise "),

  check("Cin").not().isEmpty().withMessage("Numéro CIN  est  requis "),
  check("name").not().isEmpty().withMessage("Le nom  est  requis "),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("rooms")
    .isArray({ min: 1 })
    .withMessage("Il faut ajouter des chambres "),
  check("rooms.*.nombreAdulte")
    .isFloat({ min: 0 })
    .withMessage("Nombres des adultes   est  requis "),
  check("rooms.*.nombreEnfants2ans")
    .isFloat({ min: 0 })
    .withMessage("Nombres des enfants moins 2 ans  est  requis "),
  check("rooms.*.nombreEnfants12ans")
    .isFloat({ min: 0 })
    .withMessage("Nombres des enfants moins 12 ans  est  requis "),
];
