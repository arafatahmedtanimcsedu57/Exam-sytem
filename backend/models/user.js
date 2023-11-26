const mongoose = require("mongoose");
const userSchema = require("../schemas/user");

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
