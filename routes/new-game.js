const fs = require("fs");
const parseCookie = require("../lib/parseCookie");
const checkForSession = require("../lib/checkForSession");

module.exports = async (req, res, db, rt) => {
  if(req.url == '/new-game'){
    // The user has signaled they wish to create a new game
    // Make sure user is not already in a game
    const sessionUser = await checkForSession(req, db);
    if(sessionUser)new Promise(async function(resolve, reject) {
      console.log('User is signed in: ' + sessionUser.username);
      // Add new row to games collection
      const newGame = {creatorId: sessionUser._id, status: 'open'};
      const insertResult = await db.collection("games").insertOne(newGame);
      // Add new row to squares collection. Game board will be 25 squares
      let i = 1;
      while(i < 26){
        const newSquare = {gameId: insertResult.insertedId, position: i, owner: 'None'};
        const insertResult2 = await db.collection("squares").insertOne(newSquare);
        i++;
      }

      // Join user to game room
      const filter = {_id: sessionUser._id};
      const update = {$set: {gameId: insertResult.insertedId}};
      await db.collection("users").updateOne(filter, update);
      console.log('New Game created');
      rt.emit("new-game-created", newGame);
    });
    console.log('New Game created for ' + sessionUser.username);
    res.setHeader("Location", "/");
    res.statusCode = 302;
    res.end();
    return true; // Exit Function
  }
}
