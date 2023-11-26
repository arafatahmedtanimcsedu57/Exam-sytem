var mongoose = require("mongoose");
var optionSchema = require("../schemas/option");

var OptionModel = mongoose.model("OptionModel", optionSchema);
module.exports = OptionModel;
