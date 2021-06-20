const jwt = require("jsonwebtoken");

// env variables
const { jwtSecret } = require("./envVariables.js");

function generateToken(userId) {
  const payload = {
    id: userId,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, jwtSecret, options);
  return token;
}

module.exports = generateToken;
