const mongoose = require("mongoose");

const login = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  emp_id: {
    type: String,
    required: true,
    unique: "Username is already Exists",
  },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("leave_management_login", login);
