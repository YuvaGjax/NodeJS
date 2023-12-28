const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PersonInfoModel = require("../../model/employee-details/personalInfo");
const auth = require("../../../middleware/auth");
const VISIBLE_CONTENT =
  "_id empName empId email phoneNumber gender dob departmentName departmentId";

router.post("/create", auth, async (req, res) => {
  const personInfoModel = new PersonInfoModel({
    _id: new mongoose.Types.ObjectId(),
    empName: req.body.empName,
    empId: req.body.empId,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    dob: req.body.dob,
    departmentName: req.body.departmentName,
    departmentId: req.body.departmentId,
  });
  personInfoModel
    .save()
    .then((result) => res.status(200).json({ status: 200, response: result }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", auth, async (req, res) => {
  PersonInfoModel.find()
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  PersonInfoModel.findById(id)
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.patch("/update/:id", auth, async (req, res) => {
  const id = req.params.id;
  PersonInfoModel.updateOne({ _id: id }, req.body)
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) =>
      res.status(200).json({ status: 200, message: "Updated Succesfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", auth, async (req, res) => {
  const id = req.params.id;
  PersonInfoModel.deleteOne({ _id: id })
    .exec()
    .then(() =>
      res.status(200).json({ status: 200, message: "Deleted SuccessFully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
