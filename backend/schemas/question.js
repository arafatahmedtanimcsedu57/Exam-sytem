var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema(
  {
    body: {
      required: true,
      type: String,
    },
    weightAge: {
      required: true,
      type: Number,
      default: 1,
    },
    ansCount: {
      required: true,
      type: Number,
      default: 1,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OptionModel",
        required: true,
      },
    ],
    explanation: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectModel",
      required: true,
    },
    quesImg: {
      required: false,
      default: null,
      type: String,
    },
    difficulty: {
      required: true,
      default: 0,
      type: Number,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        type: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    status: {
      type: Boolean,
      default: 1,
      required: true,
    },
  },

  { timestamps: {} }
);

module.exports = questionSchema;
