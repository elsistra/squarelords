// Add Game to User's data
const checkForSession = require("../lib/checkForSession");
const fs = require("fs");
const util = require("util");
const parseCookie = require("../lib/parseCookie");
const URL = require('url').URL;
const ObjectId = require("mongodb").ObjectId;
const assignSquare = require("../lib/assignSquare");

module.exports = async (req, res, db, rt) => {
  const urlObj = new URL(req.url, 'http://localhost');
  if(urlObj.pathname == '/join-game'){
    const sessionUser = await checkForSession(req, db);
    if(sessionUser){
      // User is logged in, so we will add them to game
      const gameId = urlObj.searchParams.get('id');
      const filter = {_id: sessionUser._id};
      const update = {$set: {gameId: new ObjectId(gameId)}};
      await db.collection("users").updateOne(filter, update);
      console.log('User has joined the game');
      // Assign the user a village
      let village = '';
      while(village !== 'assigned'){
        // Pick a random location on the map
        const randomSquare = Math.floor(Math.random() * 1600) + 1
        if(await assignSquare(randomSquare, 'village', sessionUser._id, db)){
          // Success it worked!
          village = 'assigned';
          rt.emit("new-game-joined", {sessionUser, randomSquare});
        }
      }
      // Send user to game
      res.setHeader("Location", "/game");
      res.statusCode = 302;
      res.end();
      return true; // Exit Function
    }else{
      // User is not logged in
      console.log('No session found. Redirecting user to login');
      res.setHeader("Location", "/login");
      res.statusCode = 302;
      res.end();
    }
  }
}
