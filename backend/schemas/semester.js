const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    year: {
      required: true,
      type: String,
    },
    status: {
      required: true,
      default: 1,
      type: Boolean,
    },
  },
  { timestamps: {} }
);

module.exports = semesterSchema;
