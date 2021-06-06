/* eslint-disable no-undef */
const server = require("./api/server");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const config = require("./api/config");

const port = config.port || 5000;

const client = new MongoClient(config.devDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
  wtimeout: 2500,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db().command({ ping: 1 });
    console.log("Connected successfully to server");
    server.listen(port, () => {
      console.log(`\n\n Listening on port ${port}\n\n`);
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
