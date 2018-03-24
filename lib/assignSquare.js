// Read Cookie information to determine if user is logged in
async function assignSquare(position, type, userId, db){
  // Get GameID of User
  const userGameIdCheck = await db.collection('users').findOne({_id: userId})
  console.log('[assignSquare()] userGameIdCheck:', typeof userId, userId);
  if(userGameIdCheck && userGameIdCheck.gameId){
    const userGameId = userGameIdCheck.gameId
    console.log('[assignSquare()] userGameId:', userGameId);
    // Check if that location is taken
    const emptySquareCheck = await db.collection('squares').findOne({position: position, owner: 'None', gameId: userGameId})
    if(emptySquareCheck){
      // Location is indeed empty so we can assign the village to it
      const filter = {position: position, gameId: userGameId};
      const update = {$set: {type: type, owner: userId}};
      const result = await db.collection("squares").updateOne(filter, update);
      console.log('Square '+position+' assigned to user with type: '+type);
      village = 'assigned';
      return true;
    }else{
      // Location is taken
      return false;
    }
  }
  return false;
}
module.exports = assignSquare;
