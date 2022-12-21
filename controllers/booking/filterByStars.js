const Hotel = require("../../models/hotel");


exports.filterByStars = async (req, res) => {
  const { bookings, stars } = req.body;
  try {
    const hotels = bookings.filter((el) => el.item.etoiles === stars);
    if (hotels.length !== 0) {
      res.status(200).send({ message: "hotels found", response });
    } else {
      res.status(400).send({ message: "Pas d'offres disponible" });
    }
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};

