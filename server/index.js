const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/queries.js');

let port = process.env.PORT || 2807;
let app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/users/:id', (req, res) => {
  let user_id = req.params.id;
  db.getUserInfo(user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result.rows[0]);
    }
  });
});

app.get('/jobs/:id', (req, res) => {
  let user_id = req.params.id;
  db.getJobsInfo(user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result.rows);
    }
  });
});



app.listen(port, function() {
  console.log(`Connecting to ThuBD on port ${port}`);
})