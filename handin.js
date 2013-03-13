#!/usr/bin/env node

var students = require('students.json');

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
		console.log("This is the handin automation software HandIn");
		console.log("Possible commands are : ");
		console.log("create - create directorys and initialise git repos in each one for students to submit to");
		console.log("report - run tests on student code and generate a report");
}

function create() {

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
