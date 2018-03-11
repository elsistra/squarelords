process.on("unhandledRejection", (error) => { throw error; });
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseCookie = require("../lib/parseCookie")
const ObjectId = require("mongodb").ObjectId;

module.exports = async (req, res, db) => {
  const cookie = parseCookie(req);
  // Check the sessions table to get the userId
  let user;
  if(cookie.session){
    const session = await db.collection("sessions").findOne({_id: new ObjectId(cookie.session)});
    if(session && session.userId){
      user = await db.collection("users").findOne({_id: session.userId});
    }
  }
  console.log("is logged in?", user);
  // Check the users table to get username
  // If username exists...

  if(req.url == '/'){
    const html = await readFile("views/index.html");
    res.end(html);
    return true; // Exit Function
  }
}
