const Booking = require("../../models/booking");
exports.loadPaidVoucherByHotel = async (req, res) => {
  try {
    const PAGE_SIZE = 7;
    const page = parseInt(req.query.page || "0");
    const query = {};
    if (req.query.search) {
      query.Cin = {
        $regex: req.query.search,
        $options: "i",
      };
      query.paidAgency = true;
      query.nomHotel = req.query.hotel;
    }

    if (req.query.search === "") {
      const resut = await Booking.find({
        nomHotel: req.query.hotel,
        paidAgency: true,
      }).sort({
        _id: -1,
      });
      const result = await Booking.find({
        nomHotel: req.query.hotel,
        paidAgency: true,
      })
        .sort({
          _id: -1,
        })
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(resut.length / PAGE_SIZE),
        message: "vouchers  trouvés!",
      });
    } else {
      const result = await Booking.find(query).sort({ _id: -1 });

      res.send({
        response: result,
        totalPages: 1,
        message: "vouchers trouvés!",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "erreur serveur" });
  }
};
