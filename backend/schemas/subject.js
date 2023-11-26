var mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema(
  {
    topic: {
      required: true,
      type: String,
    },
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

module.exports = subjectSchema;
