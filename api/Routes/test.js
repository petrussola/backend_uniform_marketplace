const express = require("express");

const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.status(200).json("server is up and running");
});

module.exports = testRouter;
