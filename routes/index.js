process.on("unhandledRejection", (error) => { throw error; });
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseCookie = require("../lib/parseCookie")

module.exports = async (req, res, db) => {
  const cookie = parseCookie(req);
  // Check the sessions table to get the userId
  var user;
  db.collection('users').findOne({session: cookie.session}, function(err, user){
    //console.log(user);
  })
  // Check the users table to get username
  // If username exists...

  if(req.url == '/'){
    const html = await readFile("views/index.html");
    res.end(html);
    return true; // Exit Function
  }
}
