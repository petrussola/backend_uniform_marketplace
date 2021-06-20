/* eslint-disable no-undef */

require("dotenv").config();

const config = {
  port: process.env.PORT,
  devDbUri: process.env.DEV_DB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
