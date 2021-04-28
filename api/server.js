const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// routes
const testRouter = require("./Routes/test");

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/", testRouter);

module.exports = server;
