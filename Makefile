
ARGS=-t [ reactify --es6 --everything --visitors jstransform/visitors/es6-destructuring-visitors ]

js:
	browserify ${ARGS} -d run.js -o www/react-demobox.js

less:
	lessc less/theme.less build/theme.css

pages:
	mkdir -p pages/demobox
	cp build/* pages/demobox

gen:
	./bin/demobox

.PHONY: less js pages
