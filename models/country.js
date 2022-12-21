const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  cloudinary_ids: { type: Array, default: [] },
  pictures: { type: Array, default: [] },
});

module.exports = Country = model("country", CountrySchema);
