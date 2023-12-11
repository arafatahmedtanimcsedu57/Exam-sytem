var mongoose = require("mongoose");
var tagSchema = require("../schemas/tag");

var TagModel = mongoose.model("TagModel", tagSchema);
module.exports = TagModel;
