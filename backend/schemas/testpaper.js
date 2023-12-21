var mongoose = require("mongoose");
var testSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionModel",
        required: false,
      },
    ],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectModel",
      required: false,
    },

    duration: {
      type: Number,
      required: true,
    },
    organisation: {
      type: String,
      required: false,
    },
    difficulty: {
      type: Number,
      default: 1,
      required: false,
    },
    testBegins: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      required: true,
      default: 1,
      type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    isRegistrationAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    testConducted: {
      type: Boolean,
      default: false,
      required: true,
    },
    isResultGenerated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: {} }
);

module.exports = testSchema;
