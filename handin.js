#!/usr/bin/env node

var students = require('./students.json');

// handle a variety of different args dependent on second command

var command = String(process.argv[2]);

switch(command) {
	case "create" :
		create();
		break;
	case "report" :
		generateReport();
		break;
	default : 
		console.log("INFO : This is the handin automation software HandIn");
		console.log("INFO : Possible commands are : ");
		console.log("INFO : create - create directorys and initialise git repos in each one for students to submit to");
		console.log("INFO : report - run tests on student code and generate a report");
}


//create repos for all students in students.json
//adding a readme with task to be completed
function create() {
	Object.keys(students).forEach(function (key) {
		var err = genDir(students[key].login);
		if(err) {
			console.log("ERR : Error during creation of directory for : " + students[key].login);
		} else {
			console.log("INFO : Directory created for : " + students[key].login);
		}
	});
}

function genDir(login){
	// spawn exec function to make sure dir is created
	return 0;
}

function generateReport() {
	// generate a report for all the submitted code
	// create new report file
	// append the following to the report
	// for each user test()
}

function test() {
	// grab main.* from each repo
	// run test framework with each students code
	// generate a report for each student
	// identify any users that haven't submitted and include at top of report
}
