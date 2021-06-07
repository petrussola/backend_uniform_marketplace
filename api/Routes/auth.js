const express = require("express");
const client = require("../../database/client");

// dao = data access object
const { signup } = require("../../database/dao/users");

// middleware
const {
  lowerCaseAndTrimEmail,
  checkPasswordLength,
  bcryptPassword,
} = require("../Middleware/authMiddleware");

// helpers
const { successResponse, errorHelper } = require("../Helpers/Responses");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  [lowerCaseAndTrimEmail, checkPasswordLength, bcryptPassword],
  async (req, res) => {
    const { email, password } = req;
    try {
      const user = await signup(client, { email, password });
      if (user && user.insertedCount === 1) {
        return successResponse(res, 200, "User has been created");
      } else {
        return errorHelper(res, 500, "User creation in database has failed");
      }
    } catch (err) {
      return errorHelper(res, 500, err.message);
    }
  }
);

module.exports = authRouter;
