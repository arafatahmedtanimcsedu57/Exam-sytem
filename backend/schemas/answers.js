var mongoose = require("mongoose");
var answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionModel",
    required: true,
  },
  chosenOption: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "options",
      required: false,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TraineeEnterModel",
    required: false,
  },
});
module.exports = answerSchema;
