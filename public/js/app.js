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
    newElement.textContent = game._id;
    listElement.appendChild(newElement);
  });
});
