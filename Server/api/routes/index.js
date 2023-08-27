const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Model = require("../model/index");

router.post("/save", (req, res) => {
  const personInfo = new Model({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
  });
  personInfo
    .save()
    .then((result) =>
      res.status(200).json({ message: "POST Request", info: result })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Model.find()
    .select("_id name age")
    .exec()
    .then((body) => res.status(200).json(body))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Model.findById(id)
    .select("_id name age")
    .exec()
    .then((body) => res.status(200).json(body))
    .catch((err) => res.status(500).json({ error: err }));
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  Model.updateOne({ _id: id }, req.body)
    .select("_id name age")
    .exec()
    .then((body) => res.status(200).json({ message: "Updated Succesfully" }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Model.deleteOne({ _id: id })
    .exec()
    .then(() => res.status(200).json({ message: "Deleted SuccessFully" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
