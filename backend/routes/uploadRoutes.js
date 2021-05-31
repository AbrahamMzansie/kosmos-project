const express = require("express");
const router = express.Router();
const User = require("../models/userModels");


router.post("/:id", async (req, res) => {
  const {url} = req.body.userData;
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },{ $set: { image: url } }, { new: true });
  res.send(user);
});
module.exports = router;
