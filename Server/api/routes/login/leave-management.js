const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const LeaveModel = require("../../model/login/leave-management");
const { ADMIN_EMP_ID } = require("../../constant");

router.get("/login", (req, res) => {
  LeaveModel.find()
    .select("_id emp_id password isAdmin")
    .exec()
    .then((body) => res.status(200).json(body))
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/create", (req, res) => {
  const personInfo = new LeaveModel({
    _id: new mongoose.Types.ObjectId(),
    emp_id: req.body.emp_id,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  personInfo
    .save()
    .then((result) =>
      res.status(200).json({
        status: 200,
        message: "created Successfull",
        info: result,
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", (req, res) => {
  const emp_id = req?.body?.emp_id;
  const password = req?.body?.password;
  //   checking emp_id exists
  LeaveModel.findOne({ emp_id: emp_id })
    .select("_id emp_id password isAdmin")
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
