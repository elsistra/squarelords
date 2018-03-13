const fs = require("fs");
const parseCookie = require("../lib/parseCookie");
const checkForSession = require("../lib/checkForSession");

module.exports = async (req, res, db) => {
  if(req.url == '/new-game.html'){
    // The user has signaled they wish to create a new game
    // Make sure user is not already in a game
    const sessionUser = await checkForSession(req, db);
    if(sessionUser)new Promise(function(resolve, reject) {
      console.log('User is signed in: ' + sessionUser.username);
      // Create new Game
      // Join user to game room

      // Later index.js can be updated to list games
    });
    console.log('New Game created for ' + sessionUser.username);
    res.setHeader("Location", "/");
    res.statusCode = 302;
    res.end();
    return true; // Exit Function
  }
}
