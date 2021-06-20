// client
const client = require("../../database/client");

// helpers
const { successResponse, errorHelper } = require("../Helpers/Responses");

// dao = data access object
const { signup } = require("../../database/dao/users");

// jwt method
const generateToken = require("../Config/jwt");

const signupController = async (req, res) => {
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
};

const loginController = async (req, res) => {
  const { passwordIsValid, user } = req;
  if (passwordIsValid && user._id) {
    const token = generateToken(user._id);
    return successResponse(res, 200, "User can login", token);
  } else {
    return errorHelper(res, 500, "Invalid credentials");
  }
};

module.exports = {
  signupController,
  loginController,
};
