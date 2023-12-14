const mongoose = require("mongoose");

const studentModel = new mongoose.Schema(
  {
    name: {
      require: true,
      type: String,
    },
    studentId: {
      required: true,
      type: String,
      unique: true,
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
    status: {
      required: true,
      default: 1,
      type: Boolean,
    },
  },
  { timestamps: {} }
);

module.exports = studentModel;
