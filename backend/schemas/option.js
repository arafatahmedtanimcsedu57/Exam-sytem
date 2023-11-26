const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  optBody: {
    required: false,
    type: String,
  },
  optImg: {
    type: String,
    required: false,
    default: null,
  },
  isAnswer: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = optionSchema;
