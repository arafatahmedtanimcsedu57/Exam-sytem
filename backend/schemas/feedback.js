var mongoose = require("mongoose");
var feedbackschema = new mongoose.Schema({
  feedback: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TraineeEnterModel",
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaperModel",
    required: true,
  },
});
module.exports = feedbackschema;
