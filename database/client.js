const { MongoClient } = require("mongodb");

const config = require("../api/config");

const client = new MongoClient(config.devDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
});

module.exports = client;
