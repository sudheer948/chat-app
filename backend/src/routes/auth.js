const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  console.log("signup route hit");
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "user added successfully!", data: savedUser });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "User already exists. Please sign in.",
      });
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Please enter valid details.",
      });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid input provided.",
      });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const createError = (message, statusCode = 401) => {
      const error = new Error(message);
      error.statusCode = statusCode;
      return error;
    };

    if (!validator.isEmail(emailId)) {
      throw createError("email is not valid!", 400);
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw createError("Invalid email or password");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw createError("Invalid email or password.");
    }

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({ message: "user login successful...", data: user });
    }
  } catch (err) {
    console.log(err?.message);
    return res.status(err.statusCode || 500).json({
      message: err.statusCode
        ? err.message
        : "Something went wrong. Please try again later.",
    });
  }
});

module.exports = authRouter;
