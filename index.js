const server = require("./api/server");
require("dotenv").config();

const config = require("./api/config");

const port = config.port || 5000;

server.listen(port, () => {
  console.log(`\n\n Listening on port ${port}\n\n`);
});
