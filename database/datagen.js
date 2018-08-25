const faker = require('faker');
const fs = require('fs');
const moment = require('moment');

let usersId = 1;
let jobsId = 1;
let userString = '';

let createUsers = function() {
  for (let i = 1; i <= 100000; i++) {
    let randomY = Math.floor(9 * Math.random());
    let randomM = Math.ceil(12 * Math.random());
    let randomD = Math.ceil(29 * Math.random());
    userString += `${i}, ${faker.name.firstName() + ' ' + faker.name.lastName()}, ${faker.name.firstName()}, ${faker.name.firstName() + '@gmail.com'}, ${faker.name.firstName() + ' street'}, 201${randomY}-${randomM}-${randomD}, ${''}\n`
  }
  fs.writeFileSync(`./csvs/users/users.txt`, userString);
  userString = '';
};

let createJobs = function() {
  
};

// createUsers();
// createJobs();
//
