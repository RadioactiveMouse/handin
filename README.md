Hand In
======

Project handin software for automated feedback and easier development for both students and lecturers. Lecturers must include an instructions.md file and a folder that contains tests so the student can do local testing of their solution.

Typical Flow
-----

* Lecturer runs a command to create repos for everyone in students.json
* Students can clone the repos with a readme containing the task information
* Students develop against the spec in readme
* Students can run local versions of the tests in their repos
* Students then submit finished code to be tested
* Students can tag their release using git tag to signify finished codebases


Additions
-------
* Scheduled job runs anything committed to the repos against lecturer defined tests and emails students with results

License
-----

MIT
