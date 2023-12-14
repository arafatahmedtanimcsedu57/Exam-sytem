const mongoose = require("mongoose");
const sectionSchema = require("../schemas/section");

const SectionModel = mongoose.model("SectionModel", sectionSchema);
module.exports = SectionModel;
