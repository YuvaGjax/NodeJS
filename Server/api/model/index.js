const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  age: Number,
});

module.exports = mongoose.model("schema", schema);
