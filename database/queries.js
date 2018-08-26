var db = require('./config.js');

const getCreatedAt = (user_id, whenRatings) => {
  let qs = `SELECT created_at FROM users WHERE id = ${user_id}`;
  db.query(qs, whenRatings);
}

module.exports = {
  getCreatedAt: getCreatedAt
}

