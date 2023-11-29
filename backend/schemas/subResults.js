var mongoose = require("mongoose");
var subResultsSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionModel",
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: Array,
    required: true,
  },
  givenAnswer: {
    type: Array,
    required: true,
  },
  weightAge: {
    type: Number,
    required: true,
  },
  iscorrect: {
    type: Boolean,
  },
});
module.exports = subResultsSchema;
