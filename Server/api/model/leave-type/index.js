const mongoose = require("mongoose");

const leaveType = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
});

module.exports = mongoose.model("LeaveType", leaveType);
