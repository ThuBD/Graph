var db = require('./config.js');

const getCreatedAt = (user_id, cb) => {
  let qs = `SELECT created_at FROM users WHERE id = ${user_id}`;
  db.query(qs, cb);
};

const getUserInfo = (user_id, cb) => {
  let qs = `SELECT * FROM users WHERE id = ${user_id}`;
  db.query(qs, cb);
};

const getJobsInfo = (user_id, cb) => {
  let qs = `SELECT * FROM jobs WHERE user_id = ${user_id}`;
  db.query(qs, cb);
};

module.exports = {
  getCreatedAt: getCreatedAt,
  getUserInfo: getUserInfo,
  getJobsInfo: getJobsInfo
};

