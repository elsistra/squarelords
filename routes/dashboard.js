const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseBody = require("../lib/parseBody");
const checkForSession = require("../lib/checkForSession");

module.exports = async (req, res, db) => {
  if(req.url == '/dashboard.html'){
    if(req.method === 'GET'){
      // If user already has a game, send them to game.html
      const sessionUser = await checkForSession(req, db);
      if(sessionUser){
        // User is logged in, Check user for an existing game
        if(sessionUser.gameId){
          const gameId = sessionUser.gameId;
          //Game Exists, send user to game.js
          const html = await readFile("views/game.html");
          res.end(html);
          return true; // Exit Function
        }else{
          // Game does not exist, keep user on dashboard.js
          const html = await readFile("views/dashboard.html");
          res.end(html);
          return true; // Exit Function
        }
      }else{
        // User is not logged in, why are they on the dashboard?
      }
    }
  }
}
