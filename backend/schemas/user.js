const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    emailId: {
      required: true,
      type: String,
      unique: true,
    },
    contact: {
      required: true,
      type: String,
      unique: true,
    },
    avatar: {
      required: false,
      type: String,
    },
    type: {
      required: true,
      type: String,
      default: "TRAINER",
    },
    status: {
      required: true,
      default: 1,
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },

  { timestamps: {} }
);

module.exports = userSchema;
