const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    profilePic: {
      type: String,
      default: ""
    },

    authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "local",
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      }
    },

    domain: {
      type: String,
      enum: ["JEE", "NEET", "ENGINEERING"],
      default: null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
