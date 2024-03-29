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
var reportfile = "";
var reportcontent = "";
var extension = "rb";

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
	if(!fs.existsSync("instructions.md")){
		console.log("ERR : No instructions.md file. Exiting without finishing...");
		return 1;
	}
	if(!fs.existsSync("tests")){
		console.log("ERR : No tests file. Exiting without finishing... ");
		return 1;
	}
	if(!fs.existsSync(project)){
		fs.mkdirSync(project);
		fullpath = project + "/";
		console.log("INFO : Project folder created");
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
	var localpath = fullpath+login;
	if(!fs.existsSync(localpath)){
		fs.mkdirSync(localpath);
	}
	// pipe the readme containing the instructions into the student directories
	fs.createReadStream("instructions.md").pipe(fs.createWriteStream(localpath+"/instructions.md"));
	// init a git repo in each of the login directories
	exec("cd "+localpath+" && git init",function(err,stdout,stderr){
		if(err) {
			console.log("ERR : Error during git repo init : " + err);
			return 1;
		} else {
			console.log("INFO : Git repo created for " + login);
		}
	});
	exec("cp -r tests "+ localpath + "/tests", function(err,stdout,stderr){
		if(err){
			console.log("ERR : Unable to create test directory err " + err);
		} else {
			console.log("INFO : Test directory created for : " + login);
		}
	});
	return 0;
}

// get the extension of the file that we are expecting the students to submit
function getExtension(){
	var files = fs.readdirSync("tests");
	// check for main in the files list
	// could get more fancy like finding the most frequent extension
	var first = files[0].split(".");
	var ext = first[1];
	return ext;
}

// generate a report for all the submitted code
// create new report file
// append the following to the report
// for each user test()
function generateReport(){
	//create reports folder (if it doesn't already exist)
	if(!fs.existsSync("reports")){
		fs.mkdirSync("reports");
	}
	
	//create a file called by timestamp
	var date = new Date();
	reportfile = "reports/"+date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"--"+date.getHours()+"h"+date.getMinutes()+"m.tex";
	
	writeReport();
	var err = createPDF();
	if(err){
		console.log("ERR : Error during creation of PDF report");
	}
}

function writeReport(){
	fs.appendFileSync(reportfile,"\\documentclass{article}");
	fs.appendFileSync(reportfile,"\\title{Student Coursework Reports}\n");
	fs.appendFileSync(reportfile,"\\begin{document}\n");
	fs.appendFileSync(reportfile,"\\maketitle\n");
	//reportcontent = "\\documentclass{article}\n\\title{Student Coursework Reports}\n\\begin{document}\n\\maketitle\n"
	//loop through each user test
	//write to file
	Object.keys(students).forEach(function (key){
		fs.appendFileSync(reportfile,"\\section*{"+students[key].fullname+"("+students[key].login+")}\n");
		//reportcontent = reportcontent+"\\section*{"+students[key].fullname+"("+students[key].login+")}\n";
		var err = test(students[key].login);
		if(err) {
			console.log("ERR : Error generating report for : " + students[key].login);
		} else {
			console.log("INFO : Report added for : " + students[key].login);
		}
	});
	//reportcontent= reportcontent+"\\end{document}\n";
	console.log("INFO : appending result to report file");
	fs.appendFileSync(reportfile,"\\end{document}\n");
}

// grab main.* from each repo
// run test framework with each students code
// generate a report for each student
// identify any users that haven't submitted and include at top of report
// can check the current tags using `git tag -l`
function test(login) {
	var path = project+"/"+login;
	console.log("path : " + path);
	var filename = "";
	if(!fs.existsSync(path+"/main."+extension)){
		fs.appendFileSync(reportfile, "FAIL : main file does not exist");
		return 0;
	}
	fs.appendFileSync(reportfile, "PASS : main file exists");
}

//create the PDF version from the latex file
function createPDF(){
	exec("cd reports && pdflatex -interaction=nonstopmode -halt-on-error ../"+reportfile,function(err,stdout,stderr){
		if(err){
			return 1;
		}else{
			return 0;
		}
	});
}
