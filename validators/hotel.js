const { check } = require("express-validator");
exports.addhotelValidator = [
  check("name").not().isEmpty().withMessage("Le nom est requis"),
  check("description").not().isEmpty().withMessage("Description est  requise "),
  check("ville").not().isEmpty().withMessage("Ville  est  requise "),
  check("localisation")
    .not()
    .isEmpty()
    .withMessage("localisation  est  requise "),
  check("etoiles")
    .isFloat({ min: 1, max: 5 })
    .withMessage("les étoiles sont requises"),

  check("metadescription")
    .not()
    .isEmpty()
    .withMessage(" meta_description est  requis "),
  check("metatitle").not().isEmpty().withMessage(" meta_title est  requis "),

  check("metakeywords.*")
    .not()
    .isEmpty()
    .withMessage(" meta_keywords est  requis "),
  check("besthotel").isBoolean().withMessage("bestHotel  est  requis "),
  check("familyonly").isBoolean().withMessage("familyOnly  est  requis "),
  check("suppvuesurmer")
    .optional()
    .not()
    .isEmpty()
    .withMessage("SuppVueSurMer  est  requis "),
  check("prices").isArray({ min: 1 }).withMessage("Il faut ajouterles prix "),
  check("prices.*.datedebut")
    .not()
    .isEmpty()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("la date de début de l'intervalle   est  requise "),
  check("prices.*.datefin")
    .not()
    .isEmpty()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("la date de début de l'intervalle   est  requise "),
  check("prices.*.pricelpdadulte")
    .isFloat({ min: 0 })
    .withMessage("prix adulte  en lpd  est  requis "),
  check("prices.*.reductionenfant2ans")
    .isFloat({ min: 0 })
    .withMessage("reductionenfant2ans  est  requis "),
  check("prices.*.reductionenfant12ans")
    .isFloat({ min: 0 })
    .withMessage("reductionenfant12ans  est  requis "),
  check("prices.*.reductionenfantadulte")
    .isFloat({ min: 0 })
    .withMessage("reductionenfantadulte  est  requis "),
  check("prices.*.reductionenfantsingle")
    .isFloat({ min: 0 })
    .withMessage("reductionenfantsingle  est  requise "),
  check("prices.*.reduction3lit")
    .isFloat({ min: 0 })
    .withMessage("reduction3lit  est  requis "),
  check("prices.*.reduction4lit")
    .isFloat({ min: 0 })
    .withMessage("reduction4lit est  requis "),
  check("prices.*.supsingle")
    .isFloat({ min: 0 })
    .withMessage("supsingle en lpd  est  requis "),
  check("prices.*.discount")
    .isFloat({ min: 0 })
    .withMessage("discount  est  requis "),

  check("prices.*.pricedpadulte")
    .isFloat({ min: 0 })
    .withMessage("prix adulte  en dp est  requis "),
  check("prices.*.pricepcadulte")
    .isFloat({ min: 0 })
    .withMessage("prix adulte  en pc  est  requis "),
  check("prices.*.priceallinsoftadulte")
    .isFloat({ min: 0 })
    .withMessage("prix adulte  en all in soft   est  requis "),
  check("prices.*.priceallinadulte")
    .isFloat({ min: 0 })
    .withMessage("prix adulte  en all in hard est  requis "),

  check("supsuite")
    .isFloat({ min: 0 })
    .withMessage("supplément suite  est  requis "),

  check("totalchambre")
    .isFloat({ min: 0 })
    .withMessage("Nombre total des chambres est  requis "),
  check("maxchambre")
    .isFloat({ min: 0 })
    .withMessage("le nombre maximal de personnes par chambre   est  requis "),
  check("autres").isFloat({ min: 0 }).withMessage("autres  est  requis "),
];
exports.updatehotelValidator = [
  check("id").not().isEmpty().withMessage("id   est  requis "),
];
exports.loadallhotelsValidator = [
  check("page").not().isEmpty().withMessage("le numéro de page  est  requis "),
];
exports.searchHotelValidator = [
  check("search").not().isEmpty().withMessage(" nom hotel    est  requis "),
];
exports.deletePhotolValidator = [
  check("imageID").not().isEmpty().withMessage("  image     est  requise "),
  check("pictureUrl")
    .not()
    .isEmpty()
    .withMessage("  image url      est  requis"),
  check("id").not().isEmpty().withMessage("  id hotel     est  requis "),
];
