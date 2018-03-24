// Read Cookie information to determine if user is logged in
async function assignSquare(position, type, userId, db){
  // Get GameID of User
  const userGameIdCheck = db.collection('users').findOne({_id: userId})
  if(userGameId = userGameIdCheck._id){
    console.log(userGameId);
    // Check if that location is taken
    const emptySquareCheck = await db.collection('squares').findOne({position: position, owner: 'None', _id: userGameId})
    if(emptySquareCheck){
      // Location is indeed empty so we can assign the village to it
      const filter = {position: position, _id: userGameId};
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
}
module.exports = assignSquare;
