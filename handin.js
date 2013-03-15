#!/usr/bin/env node

/*
	Hand In
	Authors : Tom Townsend @tomtowny, Laura McCormack @footpopper
	License : MIT

*/

var students = require('./students.json');
var spawn = require("child_process");
var exec = spawn.exec;
var fs = require("fs");
var path = require("path");
var command = String(process.argv[2]);
var project = "project";
var fullpath = "";

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
		console.log("INFO : create - create directories and initialise git repos in each one for students to submit to");
		console.log("INFO : report - run tests on student code and generate a report");
}


//create repos for all students in students.json
//adding a readme with task to be completed
function create() {
	// make the overarching dir for ease of copying data around
	if(!fs.existsSync(project)){
		fs.mkdirSync(project);
		fullpath = project + "/";
		console.log("INFO Project folder created");
	}
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
	// define the path to put the student directories
	if(!fs.existsSync(fullpath+login)){
		fs.mkdirSync(fullpath+login);
	}
	// pipe the readme containing the instructions into the student directories
	
	// init a git repo in each of the login directories
	/*
	exec("git init",function(err,stdout,stderr){
		if(err) {
			console.log("ERR : Error during git repo init : " + err);
			throw err;
		}
		console.log("INFO : Git repo created for " + login);
	});
	*/
	return 0;
}


// generate a report for all the submitted code
// create new report file
// append the following to the report
// for each user test()
function generateReport() {
	Object.keys(students).forEach(function (key) {
		var err = test(students[key].login);
		if(err) {
			console.log("ERR : Error generating report for : " + students[key].login);
		} else {
			console.log("INFO : Report added for : " + students[key].login);
		}
	});
}

// grab main.* from each repo
// run test framework with each students code
// generate a report for each student
// identify any users that haven't submitted and include at top of report
function test(login) {
	return 0;
}

