const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubjectModel",
      required: false,
    },
    semesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SemesterModel",
      required: false,
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: false,
    },
    studentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentModel",
        required: false,
      },
    ],
    status: {
      required: true,
      default: 1,
      type: Boolean,
    },
  },

  { timestamps: {} }
);

module.exports = sectionSchema;
