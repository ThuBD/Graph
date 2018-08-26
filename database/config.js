const pg = require('pg');

const dbString = "postgresql://postgres@localhost:5432/appcounts?ssl=false"

let db = new pg.Client(dbString);
db.connect();

module.exports = db;
