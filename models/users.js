
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{
    name: { type: String, required: true },
    businesses: [{
      name: { type: String, required: true },
      subbusinesses: [{
        name: { type: String, required: true },
      }],
    }],
  }],
});

const UserModel = mongoose.model("Users", usersSchema);

module.exports = UserModel;




/*
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
}, {versionKey: false});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

*/

/*
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true,  min: 3, max: 20, unique: true, },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);




*/