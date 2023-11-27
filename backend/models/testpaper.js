var mongoose = require("mongoose");
var testSchema = require("../schemas/testpaper");

var TestModel = mongoose.model("TestModel", testSchema);
module.exports = TestModel;
