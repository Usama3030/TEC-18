
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
}, {versionKey: false});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;



/*
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true,  min: 3, max: 20, unique: true, },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);




*/