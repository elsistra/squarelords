console.log('app.js')

const socket = io();

// Ask server for games data
socket.emit('fetch-games-list');
// Listen for games array replacement from server.
socket.on('games-list', function (gamesArray) {
  var listElement = document.getElementById('gamesList');
  // For each user in Users array...
  gamesArray.forEach((game) => {
    const newElement = document.createElement('li');
    newElement.innerHTML += game._id + ' <a href="/join-game?id='+game._id+'">Join</a>';
    listElement.appendChild(newElement);
  });
});

// Listen for creation of new games.
socket.on('new-game-created', function (game) {
  var listElement = document.getElementById('gamesList');
  const newElement = document.createElement('li');
  newElement.textContent = game._id;
  listElement.appendChild(newElement);
});

// Ask Server for List of users with certain gameId
socket.emit('fetch-usersInGame-list');
console.log('usersInGame-list fetch sent');
// Listen for creation of new games.
socket.on('usersInGame-list', function (usersInGameArray) {
  console.log('[[debug]]', 'did this work?', usersInGameArray);
  var listElement = document.getElementById('gameUsers');
  usersInGameArray.forEach((user) => {
    const newElement = document.createElement('li');
    newElement.innerHTML += game._id + ' <a href="/">'+user.username+'</a>';
    console.log('User '+user.username+' has been added to the list.');
    listElement.appendChild(newElement);
  });
});
