var mongoose = require("mongoose");
var questionSchema = require("../schemas/question");

var QuestionModel = mongoose.model("QuestionModel", questionSchema);
module.exports = QuestionModel;
