const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/queries.js');
const dataProcessing = require('./dataProcessing/dataProcessing.js');

let port = process.env.PORT || 2807;
let app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 100000}));
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

app.post('/dataProcessing/getData', (req, res) => {
  let offerCount = 0;
  let data = dataProcessing.getData(req.body, offerCount);
  res.json(data);
});

app.post('/dataProcessing/lineGraph/yAxis/derivative', (req, res) => {
  let output = dataProcessing.getDerivative(req.body);
  res.json(output);
});


app.listen(port, function() {
  console.log(`Connecting to ThuBD on port ${port}`);
})