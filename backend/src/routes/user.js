const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/users", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const users = await User.find({ _id: { $ne: loggedInUser._id } });
  res.json(users);
});

userRouter.get("/toUser/:toUserId", userAuth, async (req, res) => {
  const toUserId = req.params.toUserId;
  const user = await User.findById({ _id: toUserId });
  res.json(user);
});

module.exports = userRouter;
