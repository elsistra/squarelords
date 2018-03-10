const http = require("http");
const io = require("socket.io");
const MongoClient = require('mongodb').MongoClient;

const routes = [
  require("./routes/index"),
  require("./routes/register"),
  require("./routes/login")
];

async function main() {
  // Create client instance
  const client = await MongoClient.connect("mongodb://localhost:27017");
  // Select Squarelords DB using client instance
  const db = client.db("squarelords");
  // Create HTTP Server
  const server = http.createServer(async function (req, res) {
    // Loops through routes until a route returns true
    for (let i = 0; i < routes.length; i++) {
      if (await routes[i](req, res, db)) { return; }
    }
    res.statusCode = 404;
    res.end("Not Found");
  });
  server.listen(8080);
}

main();
