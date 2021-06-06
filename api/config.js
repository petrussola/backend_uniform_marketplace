/* eslint-disable no-undef */

require("dotenv").config();

const config = {
  port: process.env.PORT,
  devDbUri: process.env.DEV_DB_URI,
};

module.exports = config;
