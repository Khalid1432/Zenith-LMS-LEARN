const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
