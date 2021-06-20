const express = require("express");

// controllers
const { signupController, loginController } = require("../Controllers/auth.js");

// middleware
const {
  lowerCaseAndTrimEmail,
  checkIfEmailExists,
  checkPasswordLength,
  bcryptPassword,
  checkIfEmailRegistered,
  addHashedPassword,
  checkPassword
} = require("../Middleware/authMiddleware");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  [
    lowerCaseAndTrimEmail,
    checkIfEmailExists,
    checkPasswordLength,
    bcryptPassword,
  ],
  signupController
);

authRouter.post(
  "/login",
  [lowerCaseAndTrimEmail, checkIfEmailRegistered, addHashedPassword, checkPassword],
  loginController
);

module.exports = authRouter;
