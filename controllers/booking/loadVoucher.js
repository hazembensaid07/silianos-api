
const Booking = require("../../models/booking");

exports.loadVoucher = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Booking.findById(id);

    if (!result) {
      res.status(400).send({ msg: "Le voucher  n'existe pas   " });
      return;
    } else {
      res.status(200).send({ message: "Le voucher  est trouvé ", result });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
