const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/ssearche');

const userSchema = mongoose.Schema({
	"username": String,
	"password": String,
	"user_email": String,
	"created_at": String,
	"jobs": Array,
	"graphs": Number // id of the graphs
});

const jobsSchema = mongoose.Schema({
	"company_name": String,
	"position": String,
	"location": String,
	"expected_salary": Number,
	"home_address": String,
	"position_description": String,
	"resume_or_cv": String,
	"cover_letter": String,
	"personal_rating": Number,
	"display": Boolean
})

const graphsSchema = mongoose.Schema({
	"applications": Array,
	"application_status": Array,
	"offered_salaries": Array,
	"stages": Array,
	"self_reflection": Array
});

const Users = mongoose.model('Users', userSchema);
const jobsSchema = mongoose.model('Jobs', jobsSchema);
const Graphs = mongoose.model('Graphs', graphsSchema);

const saveUserInit = (userInput) => {
	bcrypt.hash(userInput.password, 10, (err, res) => {
		if (err) {
			console.log(err);
			return;
		} else {
			var data = {};
			data.username = userInput.username;
			data.password = res;
			data.user_email = userInput.email;
			var currentTime = new Date();
			var month = currentTime.getMonth() + 1;
			var date = currentTime.getDate();
			var year = currentTime.getFullYear();
			var hour = currentTime.getHours();
			var minute = currentTime.getMinutes();
			var second = currentTime.getSeconds();
			data.created_at = `${month}/${date}/${year} ${hour}:${minute}:${second}`;
			data.jobs = [];
			data.graphs = 0;
			let newUser = new Users(data);
			newUser.save((err, user) => {
				if (err) {
					console.error(err);
					return err;
				} else {
					return user;
				}
			})
		}
	})	
};

module.exports.saveUserInit = saveUserInit;