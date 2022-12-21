const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ReservationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  cin: {
    type: Number,
    required: true,
  },
  occupants: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  checked: {
    type: String,
    default: "false",
  },
});

module.exports = Reservation = model("reservation", ReservationSchema);
