const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

module.exports = async (req, res, db) => {
  if(req.url == '/'){
    const html = await readFile("views/index.html");
    res.end(html);
    return true; // Exit Function
  }
}
