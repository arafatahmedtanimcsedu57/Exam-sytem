const mongoose = require("mongoose");
const subjectSchema = require("../schemas/subject");

const SubjectModel = mongoose.model("SubjectModel", subjectSchema);
module.exports = SubjectModel;
