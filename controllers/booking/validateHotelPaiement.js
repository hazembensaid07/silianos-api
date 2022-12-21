
const Booking = require("../../models/booking");


exports.ValidateHotelPaiement = async (req, res) => {
  try {
    const { _id } = req.body;
    Booking.findOne({ _id }, async (err, voucher) => {
      if (err || !voucher) {
        return res.status(400).json({
          error: "Voucher n'existe pas",
        });
      }

      await Booking.updateOne(
        { _id: _id },
        { $set: { paidHotel: true } }
      );

      res.status(200).json({
        message: "Voucher est validé",
      });
    });
  } catch (error) {
    res.status(403).json({
      error: "internal server error ",
    });
  }
};
