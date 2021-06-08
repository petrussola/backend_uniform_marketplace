const bcrypt = require("bcrypt");

// database

// dao
const { findEmail } = require("../../database/dao/users");

// client
const client = require("../../database/client");

// helpers
const { errorHelper } = require("../Helpers/Responses");

function lowerCaseAndTrimEmail(req, res, next) {
  const { email } = req.body;
  if (email) {
    req.email = email.trim().toLowerCase();
    next();
  } else {
    res
      .status(500)
      .status({ status: "fail", message: "Email needs to be provided" });
  }
}

async function checkIfEmailExists(req, res, next) {
  try {
    const { email } = req;
    const user = await findEmail(client, email);
    if (user && user._id) {
      throw new Error("Email is already registered. Please select another one.");
    } else {
      next();
    }
  } catch (err) {
    errorHelper(res, 500, err.message);
  }
}

function checkPasswordLength(req, res, next) {
  const { password } = req.body;
  const trimmedPassword = password.trim(); // remove white spaces front and back
  if (trimmedPassword && trimmedPassword.length > 7) {
    // enforce minimum password length 8 chars
    req.password = trimmedPassword;
    next();
  } else {
    res.status(500).json({
      status: "error",
      message: "Password must be at least 8 characters long",
    });
  }
}

function bcryptPassword(req, res, next) {
  const { password } = req;
  bcrypt.hash(password, 11, (err, hash) => {
    if (!err) {
      req.password = hash;
      next();
    } else {
      res.status(500).json({
        status: "error",
        message:
          "There was a problem processing your request. Try again later.",
      });
    }
  });
}

module.exports = {
  lowerCaseAndTrimEmail,
  checkIfEmailExists,
  checkPasswordLength,
  bcryptPassword,
};
