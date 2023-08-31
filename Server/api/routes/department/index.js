const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const DepartmentModel = require("../../model/department/index");
const VISIBLE_CONTENT = "_id name";

router.post("/create", (req, res) => {
  const departmentModel = new DepartmentModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  departmentModel
    .save()
    .then((result) => res.status(200).json({ status: 200, response: result }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  DepartmentModel.find()
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  DepartmentModel.findById(id)
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  DepartmentModel.deleteOne({ _id: id })
    .exec()
    .then(() =>
      res.status(200).json({ status: 200, message: "Deleted SuccessFully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
