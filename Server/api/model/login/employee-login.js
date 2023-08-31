const mongoose = require("mongoose");

const login = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  empId: {
    type: String,
    required: true,
    unique: "Username is already Exists",
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("leave_management_login", login);
