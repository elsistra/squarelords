const http = require("http");
const io = require("socket.io");
const MongoClient = require('mongodb').MongoClient;

// ROUTE HANDLERS BELOW THIS LINE -----------------------------------------------------------------------------
const routes = [
  require("./routes/public"),
  require("./routes/index"),
  require("./routes/register"),
  require("./routes/login"),
  require("./routes/dashboard"),
  require("./routes/new-game"),
  require("./routes/logout"),
  require("./routes/game"),
  require("./routes/leave-game")
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


  // REAL TIME SERVER EMITS AND LISTENERS HERE -------------------------------------------------------------
    const realtimeServer = io(server);
    realtimeServer.on('connect', function (socket) {
      // A client has connected to the realtime server.
      socket.on('fetch-games-list', async function () {
        // This client is asking for games list data
        const gamesList = await db.collection('games').find().toArray();
        socket.emit('games-list', gamesList);
      });
    });
  server.listen(8080);
}

main();
