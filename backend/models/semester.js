const mongoose = require("mongoose");
const semesterSchema = require("../schemas/semester");

const SemesterModel = mongoose.model("SemesterModel", semesterSchema);
module.exports = SemesterModel;
