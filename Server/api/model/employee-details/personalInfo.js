const mongoose = require("mongoose");

const employee_info = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  empName: {
    type: String,
  },
  empId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  departmentName: {
    type: String
  },
  departmentId: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean
  }

});

module.exports = mongoose.model("EmployeeDetail", employee_info);
