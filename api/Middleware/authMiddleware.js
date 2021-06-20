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
    errorHelper(res, 500, "Email needs to be provided");
  }
}

async function checkIfEmailExists(req, res, next) {
  try {
    const { email } = req;
    const user = await findEmail(client, email);
    if (user && user._id) {
      throw new Error(
        "Email is already registered. Please select another one."
      );
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
    errorHelper(res, 500, "Password must be at least 8 characters long");
  }
}

function bcryptPassword(req, res, next) {
  const { password } = req;
  bcrypt.hash(password, 11, (err, hash) => {
    if (!err) {
      req.password = hash;
      next();
    } else {
      errorHelper(
        res,
        500,
        "There was a problem processing your request. Try again later."
      );
    }
  });
}

async function checkIfEmailRegistered(req, res, next) {
  const { email } = req;
  try {
    const user = await findEmail(client, email);
    if (user && user._id) {
      req.user = user;
      next();
    } else {
      throw new Error("Email is not registered. Please sign up first.");
    }
  } catch (err) {
    errorHelper(res, 500, err.message);
  }
}

function addHashedPassword(req, res, next) {
  const { user } = req;
  if (user && user.password) {
    req.hashedPassword = user.password;
    next();
  } else {
    errorHelper(res, 500, "Email is not registered. Please sign up first.");
  }
}

async function checkPassword(req, res, next) {
  const { hashedPassword } = req;
  const { password } = req.body;
  try {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (!err && result) {
        req.passwordIsValid = true;
        next();
      } else if (!err && !result) {
        errorHelper(res, 500, "Invalid credentials.");
      } else {
        errorHelper(res, 500, "Something went wrong. Please try again.");
      }
    });
  } catch (err) {
    errorHelper(res, 500, err.message);
  }
}

module.exports = {
  lowerCaseAndTrimEmail,
  checkIfEmailExists,
  checkPasswordLength,
  bcryptPassword,
  checkIfEmailRegistered,
  addHashedPassword,
  checkPassword,
};
