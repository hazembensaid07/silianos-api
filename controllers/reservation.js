const Reservation = require("../models/reservation");

exports.addReservation = async (req, res) => {
  try {
    const {
      name,
      prenom,
      nom,
      telephone,
      cin,
      occupants,
      message,
      date,
      price,
      checked,
    } = req.body;
    const reservation = new Reservation({
      name,
      prenom,
      telephone,
      cin,
      occupants,
      message,
      date,
      price,
      checked,
      nom,
    });

    const response = await reservation.save();

    res.status(200).send({ message: "La reservation est ajouté avec succés" });
  } catch (error) {
    res.status(400).send({ error: "erruer serveur" });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const result = await Reservation.deleteOne({ _id: req.params.id });
    result.n
      ? res.status(200).send({ message: "La reservations est supprimé" })
      : res.send("Resveration non trouvé");
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const {
      name,
      prenom,
      telephone,
      cin,
      nom,
      occupants,
      message,
      date,
      price,
      checked,
    } = req.body;

    const resu = await Reservation.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name,
          prenom,
          nom,
          telephone,
          cin,
          occupants,
          message,
          date,
          price,
          checked,
        },
      }
    );

    res.status(200).send({ message: "La reservation est modifié avec succés" });
  } catch (error) {
    res.status(500).send({ error: { message: "erreur serveur" } });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Reservation.findById(id);

    if (!result) {
      res.status(400).send({ msg: "Aucune reservation trouvée " });
      return;
    } else {
      res.send({ message: "Reservation trouvée ", result });
    }
  } catch (error) {
    res.status(400).send({ message: "erreur serveur" });
  }
};
exports.checkTrue = async (req, res) => {
  try {
    const resu = await Reservation.updateOne(
      { _id: req.body.id },
      {
        $set: {
          checked: "true",
        },
      }
    );

    res.status(200).send({ message: "Reservation is checked" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ error: { message: "tt" } });
  }
};
exports.getByName = async (req, res) => {
  try {
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Reservation.countDocuments({});
    const query = {};
    if (req.query.search) {
      query.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.search === "") {
      const result = await Reservation.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "Reservation trouvés!",
      });
    } else {
      const result1 = await Reservation.find(query);

      const result = await Reservation.find(query)
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      console.log(result);
      console.log(result1.length);
      res.send({
        response: result,
        totalPages: Math.ceil(result1.length / PAGE_SIZE),
        message: "Reservation trouvés!",
      });
    }
  } catch (error) {
    res.status(402).send({ message: "Il n'ya pas le reservation selectioné" });
  }
};

exports.getByChecked = async (req, res) => {
  try {
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Reservation.countDocuments({});
    console.log(total);
    const query = {};
    if (req.query.search) {
      query.checked = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.search === "") {
      const result = await Reservation.find()
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.send({
        response: result,
        totalPages: Math.ceil(total / PAGE_SIZE),
        message: "Reservation trouvés!",
      });
    } else {
      const result1 = await Reservation.find(query);
      console.log(result1.length);

      const result = await Reservation.find(query)
        .sort({ _id: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      console.log(result.length);
      console.log(result1.length);

      res.send({
        response: result,
        totalPages: Math.ceil(result1.length / PAGE_SIZE),
        message: "Reservation trouvés!",
      });
    }
  } catch (error) {
    res.status(402).send({ message: "Il n'ya pas le reservation selectioné" });
  }
};
