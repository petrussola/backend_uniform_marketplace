const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// routes
const testRouter = require("./Routes/test");
const authRouter = require("./Routes/auth");

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/", testRouter);
server.use("/auth", authRouter);

module.exports = server;
