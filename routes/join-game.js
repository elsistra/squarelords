// Add Game to User's data
const checkForSession = require("../lib/checkForSession");
const fs = require("fs");
const util = require("util");
const parseCookie = require("../lib/parseCookie");
const bodyParser = require('body-parser');
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });

module.exports = async (req, res, db) => {
  if(req.url == '/join-game'){
    const sessionUser = await checkForSession(req, db);
    if(sessionUser){
      // User is logged in, so we will add them to game
      const filter = {_id: sessionUser._id};
      const update = {$set: {gameId: ''}};
      await db.collection("users").updateOne(filter, update);
      console.log('User has joined the game');
      // Send user to game
      res.setHeader("Location", "/game");
      res.statusCode = 302;
      res.end();
      return true; // Exit Function
    }else{
      // User is not logged in
    }
  }
}
