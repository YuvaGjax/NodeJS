const mongoose = require("mongoose");

const department = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
});

module.exports = mongoose.model("Department", department);
