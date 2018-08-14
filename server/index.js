const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let port = 2807;
let app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function() {
	console.log(`Connecting to ThuBD on port ${port}`);
})