var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema(
  {
    label: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
    status: {
      type: Boolean,
      default: 1,
      required: true,
    },
  },
  { timestamps: {} }
);

module.exports = tagSchema;
