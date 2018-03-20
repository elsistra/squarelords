const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseBody = require("../lib/parseBody")

module.exports = async (req, res, db) => {
  if(req.url == '/game'){

    if(req.method === 'GET'){
      const html = await readFile("views/game.html");
      res.end(html);
      return true; // Exit Function

    }else if(req.method === 'POST'){

    }
  }
}
