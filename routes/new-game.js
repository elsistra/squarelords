const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseBody = require("../lib/parseBody")

module.exports = async (req, res, db) => {
  if(req.url == '/new-game.html'){
    console.log('New Game created');
    res.setHeader("Location", "/");
    res.statusCode = 302;
    res.end("Game Created.");
    return true; // Exit Function
  }
}
