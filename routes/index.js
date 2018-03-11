process.on("unhandledRejection", (error) => { throw error; });
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseCookie = require("../lib/parseCookie")
const ObjectId = require("mongodb").ObjectId;

module.exports = async (req, res, db) => {

  if(req.url == '/'){
    // Read Cookie information to determine if user is logged in
    const cookie = parseCookie(req);
    let user;
    // If the user has a session
    if(cookie.session){
      const session = await db.collection("sessions").findOne({_id: new ObjectId(cookie.session)});
      // If a session has been found based pm the cookies information
      if(session && session.userId){
        // Find the user row from the users table which contains the userID found in sessions
        user = await db.collection("users").findOne({_id: session.userId});
      }
    }

    // Modify the index for logged in users
    let html = await readFile("views/index.html");
    if(user){
      html += `
        <script>
          document.getElementById('a-register').style.display = 'none';
          document.getElementById('a-login').style.display = 'none';
        </script>
      `;
    }else{
      html += `
        <script>
          document.getElementById('a-logout').style.display = 'none';
          document.getElementById('a-dashboard').style.display = 'none';
        </script>
      `;
    }
    res.end(html);

    return true; // Exit Function
  }
}
