const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  nomHotel: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  logement: {
    type: String,
    required: true,
  },

  date_arrivée: {
    type: String,
    required: true,
  },
  date_départ: {
    type: String,
    required: true,
  },
  nuits: {
    type: Number,
    required: true,
  },
  accompte: {
    type: Number,
    default: 0,
  },
  num: {
    type: Number,
    default: 0,
  },
  paidAgency: {
    type: Boolean,
    required: true,
    default: false,
  },
  tel: {
    type: String,
    required: true,
  },
  Cin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paidHotel: {
    type: Boolean,

    default: false,
  },
  pdfUrl: {
    type: String,

    default: "",
  },
  pdfId: {
    type: String,

    default: "",
  },
  rooms: [
    {
      nombreAdulte: Number,
      nombreEnfants2ans: Number,
      nombreEnfants12ans: Number,
    },
  ],

  occupation: { type: Array, default: [], required: true },
});
module.exports = Booking = model("booking", BookingSchema);
