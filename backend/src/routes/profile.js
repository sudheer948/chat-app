const { userAuth } = require("../middleware/auth");

const express = require("express");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = profileRouter;
