
const Hotel = require("../../models/hotel");


exports.sortHotelsByPrice = async (req, res) => {
  const { bookings, tri } = req.body;
  try {
    //tri croissant
    if (tri === 1) {
      bookings.sort((a, b) => {
        return a.price_lpd - b.price_lpd;
      });

      res.status(200).send({ message: "hotels found", bookings });
    }
    //tri decroissant
    else if (tri === 2) {
      bookings.sort((a, b) => {
        return b.price_lpd - a.price_lpd;
      });
      res.status(200).send({ message: "hotels found", bookings });
    } else {
      res.status(200).send({ message: "hotels found", bookings });
    }
  } catch (error) {
    res.status(400).send({ message: "erreur serveur " });
  }
};
