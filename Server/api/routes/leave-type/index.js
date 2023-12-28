const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");
const LeaveTypeModel = require("../../model/leave-type/index");
const VISIBLE_CONTENT = "_id name";

router.post("/create", auth, async (req, res) => {
  const leaveTypeModel = new LeaveTypeModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  leaveTypeModel
    .save()
    .then((result) => res.status(200).json({ status: 200, response: result }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", auth, async (req, res) => {
  LeaveTypeModel.find()
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  LeaveTypeModel.findById(id)
    .select(VISIBLE_CONTENT)
    .exec()
    .then((body) => res.status(200).json({ status: 200, response: body }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", auth, async (req, res) => {
  const id = req.params.id;
  LeaveTypeModel.deleteOne({ _id: id })
    .exec()
    .then(() =>
      res.status(200).json({ status: 200, message: "Deleted SuccessFully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
