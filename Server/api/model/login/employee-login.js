const mongoose = require("mongoose");

const login = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("EmployeeLogin", login);
