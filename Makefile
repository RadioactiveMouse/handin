project:
	node handin.js create

report:
	node handin.js report
	rm reports/*.aux reports/*.log

clean:
	rm -rf reports project
