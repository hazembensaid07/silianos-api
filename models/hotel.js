const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const HotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  metadescription: {
    type: String,
  },
  metakeywords: { type: Array, default: [] },
  cloudinary_ids: { type: Array, default: [] },
  pictures: { type: Array, default: [] },
  metatitle: {
    type: String,
  },
  etoiles: {
    type: Number,
    required: true,
  },
  logement: { type: Array, default: [], required: true },
  localisation: {
    type: String,
    required: true,
  },
  prices: [
    {
      datedebut: String,
      datefin: String,
      pricelpdadulte: Number,
      pricedpadulte: Number,
      pricepcadulte: Number,
      priceallinsoftadulte: Number,
      priceallinadulte: Number,
      reductionenfant2ans: Number,
      reductionenfant12ans: Number,
      reductionenfantadulte: Number,
      reductionenfantsingle: Number,
      reduction3lit: Number,
      reduction4lit: Number,
      supsingle: Number,
      discount: Number,
    },
  ],

  supsuite: {
    type: Number,
    required: true,
    default: 0,
  },
  supvuesurmer: {
    type: Number,
    required: true,
    default: 0,
  },

  besthotel: {
    type: Boolean,
    required: true,
    default: false,
  },
  familyonly: {
    type: Boolean,
    required: true,
    default: false,
  },
  totalchambre: {
    type: Number,
    required: true,
  },
  autres: {
    type: Number,
    required: true,
    default: 0,
  },

  maxchambre: {
    type: Number,
    required: true,
  },
});
module.exports = Hotel = model("hotel", HotelSchema);
