const Hotel = require("../../models/hotel");


exports.filterByBestHotel = async (req, res) => {
  const { bookings } = req.body;
  try {
    const hotels = bookings.filter((el) => el.item.best_hotel === true);

    if (hotels.length !== 0) {
      res.status(200).send({ message: "hotels found", hotels });
    } else {
      res.status(400).send({ message: "Pas d'offres disponible" });
    }
  } catch (error) {
    res.status(400).send({ message: "erreur serveur " });
  }
};
