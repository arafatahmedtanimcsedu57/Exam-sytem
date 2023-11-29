var mongoose = require("mongoose");
var resultSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaperModel",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TraineeEnterModel",
    required: true,
  },
  answerSheetid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnswersheetModel",
    required: true,
  },
  result: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subResultsModel",
      required: true,
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
});
module.exports = resultSchema;
