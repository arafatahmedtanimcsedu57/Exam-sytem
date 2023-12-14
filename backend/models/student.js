const mongoose = require("mongoose");
const studentSchema = require("../schemas/student");

const StudentModel = mongoose.model("StudentModel", studentSchema);
module.exports = StudentModel;
