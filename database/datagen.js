const faker = require('faker');
const fs = require('fs');
const moment = require('moment');
const db = require('./queries.js');

let userString = '';
let jobString = '';
let jobsId = 1;
let jobsTextNumb = 0;
let created_atArray = [null];
// let 

let createUsers = function() {
  for (let i = 1; i <= 200000; i++) {

    let randomY = Math.floor(9 * Math.random());
    let randomM = Math.ceil(12 * Math.random());
    let randomD = Math.ceil(29 * Math.random());
    userString += `${i}, ${faker.name.firstName() + ' ' + faker.name.lastName()}, ${faker.name.firstName()}, ${faker.name.firstName() + '@gmail.com'}, ${faker.name.firstName() + ' street'}, 201${randomY}-${randomM}-${randomD}, ${''}\n`
  }
  fs.writeFileSync(`./csvs/users/users.txt`, userString);
  userString = '';
};

// 30000000 jobs
let getCreatedAt = function(created_atArray) {
  for (let i = 1; i <= 200000; i++) {
    db.getCreatedAt(i, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        created_atArray.push(results.rows[0].created_at);
        if (i % 1000 === 0) {
          console.log(i);
        }
      }
    });
  }
};

//id, user_id, company_name, date_applied, date_heard, position, location, expected_salary, offered_salary, status, position_description, resume_or_cv, cover_letter, personal_rating, display
//id, user_id, compnay_name, date_applied, date_heard, position, location, expected_salary, offered_salary, status, position_description, resume_or_cv, cover_letter, personnal_rating, display

let createJobs = function(created_atArray) {

  while (jobsTextNumb < 30) {

    for (let i = 1; i <= 1000000; i++) {
      if (i % 20000 === 0) {
        console.log(i);
      }
      let user_id = 200000 - Math.ceil((100000 * Math.random() * Math.random() * Math.random() * Math.random() * Math.random() + 100000 * Math.random() * Math.random()));
      let company_name = faker.name.firstName();
      let position = 'Software Engineer';
      let position_description = 'this position is blah blah blah blah blah';
      let resume_or_cv = 'URL to your resume!';
      let cover_letter = 'URL to your cover letter!';
      let personnal_rating = Math.round((Math.random() * (5 - 1) + 1));
      let location =faker.address.city();
      let created_at = new Date(created_atArray[user_id].substring(1));
      let applied_at = faker.date.future((0.5 * Math.random()), created_at);
      let randomNumb = Math.random();
      let status;
      let heard_at;
      if (randomNumb > 0.98) {
        status = 'offer';
      } else if (randomNumb > 0.95) {
        status = 'interview';
      } else if (randomNumb > 0.87) {
        status = 'phone-call';
      } else if (randomNumb > 0.6) {
        status = 'in-process';
      } else {
        status = 'no-offer';
      };
      if (status === 'offer' || status === 'interview' || status === 'phone-call' || status === 'in-process') {
        heard_at = faker.date.future((0.1 * Math.random() + 0.03), applied_at);
      } else {
        heard_at = applied_at;
      };

      let a = moment([created_at.getFullYear(), created_at.getMonth(), created_at.getDate()]);
      let b = moment([heard_at.getFullYear(), heard_at.getMonth(), heard_at.getDate()])
      // let b = moment([]);
      let daysSinceFirstApp = b.diff(a, 'days');

      let lowerLimit = 55000 + daysSinceFirstApp * 20000 / (daysSinceFirstApp + 50);
      let upperLimit = 105000 + daysSinceFirstApp * 40000 / (daysSinceFirstApp + 50);
      let expected_salary = faker.commerce.price(lowerLimit, upperLimit, 2, "$");
      let numberedSalary = Number(expected_salary.substring(1));
      // applied, phone-call, interview, offer, accepted, cancelled, no-offer
      if (randomNumb > 0.98) {
        offered_salary = faker.commerce.price(0.85 * numberedSalary, 1.15 * numberedSalary, 2, "$");
      } else {
        offered_salary = null;
      };
      let applied_string = `${applied_at.getFullYear()}-${applied_at.getMonth() + 1}-${applied_at.getDate()}`;
      let heard_string = `${heard_at.getFullYear()}-${heard_at.getMonth() + 1}-${heard_at.getDate()}`;
      jobString += `${jobsId}, ${user_id}, ${jobsId}_company, ${applied_string}, ${heard_string}, ${position}, ${location}, ${expected_salary}, ${offered_salary}, ${status}, ${position_description}, ${resume_or_cv}, ${cover_letter}, ${personnal_rating}\n`;
      jobsId++;
      // let date_applied = 
    }
    fs.writeFileSync(`./csvs/jobs/jobs${jobsTextNumb}.txt`, jobString);
    console.log(jobsTextNumb);
    jobsTextNumb++;
    jobString = '';
  }
};

// IMPORTANT!!!!!!!!!!!!!!!!!!!
// run schema.sql first
// You need users table to create fakedata for Jobs table, but db.query is asynchronous
// uncomment createUsers(). make users table first
// and then comment out createUsers() and uncomment getCreatedAt() and setTimeout()
// depending on your computer speed, you may need to increase timer on settimeout
// this should create all csvs you'll need (41 total)
// run insert.sql to insert data. you will need to reset the path for your csvs.

//***************
// createUsers();
// getCreatedAt(created_atArray);
// setTimeout(() => {createJobs(created_atArray)}, 115000);
//***************

