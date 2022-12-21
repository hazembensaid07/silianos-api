

const Booking = require("../../models/booking");

exports.deleteVoucher = async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id });
    result.n
      ? res.status(200).send({ message: "Le voucher  est supprimé" })
      : res.send("le voucher est  non trouvé");
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};

