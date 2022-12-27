const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
      select: false,
    },
    //used to hash the password
    salt: String,
    role: {
      type: String,
      default: "employee",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    requestAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// virtual schema to hash the password before storing it on db
userScheama
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  //comparing paswword plain text with hashed password
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password; // true false
  },
  //hashing  password using sha1 algorithm with salt
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  //generate the salt for the user
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userScheama);
