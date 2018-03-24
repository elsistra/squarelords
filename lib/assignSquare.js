// Read Cookie information to determine if user is logged in
async function assignSquare(position, type, userId, db){
  // Check if that location is taken
  const emptySquareCheck = await db.collection('squares').findOne({position: position, owner: 'None'})
  if(emptySquareCheck){
    // Location is indeed empty so we can assign the village to it
    const filter = {position: position};
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
module.exports = assignSquare;
