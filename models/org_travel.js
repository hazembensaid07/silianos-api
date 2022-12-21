//our document structure it conatines the attributes of the document with type and mention if it is required or not
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrgSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },

  price: [
    {
      date: String,
      price: Number,
    },
  ],

  metakeywords: { type: Array, default: [], required: true },
  cloudinary_ids: { type: Array, default: [] },
  pictures: { type: Array, default: [] },
  metatitle: {
    type: String,
    required: true,
  },
  metadescription: {
    type: String,
    required: true,
  },
  bestorg: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Org = model("Org", OrgSchema);
