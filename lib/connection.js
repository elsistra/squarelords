// This is a working example.

let db;

async function connection () {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  // Select Squarelords DB using client instance
  db = client.db("squarelords");
  return db;
}

function getDatabase() {
  if (!db) {
    throw new Error('Database is not set, did you forget to connect first?')
  }
  return db;
}

module.exports = {connection, getDatabase}
