const express = require("express");
const client = require("../../database/client");

// dao = data access object
const { signup } = require("../../database/dao/users");

const authRouter = express.Router();

authRouter.post("/signup", async (req) => {
  const { email, password } = req.body;
  try {
    const user = await signup(client, { email, password });
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = authRouter;
