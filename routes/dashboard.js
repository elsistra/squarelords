const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const parseBody = require("../lib/parseBody")

module.exports = async (req, res, db) => {
  if(req.url == '/dashboard.html'){

    if(req.method === 'GET'){
      const html = await readFile("views/dashboard.html");
      res.end(html);
      return true; // Exit Function
    }
  }
}
