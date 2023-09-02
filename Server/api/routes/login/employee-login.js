const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const EmployeeLoginModel = require("../../model/login/employee-login");

router.get("/", (req, res) => {
  EmployeeLoginModel.find()
    .select("_id empId password")
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Sign Up
router.post("/create", (req, res) => {
  const empId = req?.body?.empId;
  const login = new EmployeeLoginModel({
    _id: new mongoose.Types.ObjectId(),
    empId: req.body.empId,
    password: req.body.password,
  });
  EmployeeLoginModel.findOne({ empId: empId })
    .then((body) => {
      if (body) {
        res.send("404", { status: 404, message: "Emp Id already Exits" });
      } else {
        login
          .save()
          .then((result) =>
            res.status(200).json({
              status: 200,
              message: "created Successfull",
              response: result,
            })
          )
          .catch((err) => res.status(500).json({ error: err }));
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

// Sign In
router.post("/", (req, res) => {
  const empId = req?.body?.empId;
  const password = req?.body?.password;
  //   checking emp_id exists
  EmployeeLoginModel.findOne({ empId: empId })
    .select("_id empId password")
    .then((body) => {
      if (body) {
        if (password === body?.password) {
          res.status(200).json({
            status: 200,
            message: "Logged In",
            response: body,
          });
        } else {
          res.send("404", { status: 404, message: "Incorrect Password" });
        }
      } else {
        res.send("404", { status: 404, message: "Emp Id doesn't Exits" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Emp Id doesn't Exits" }));
});

module.exports = router;
