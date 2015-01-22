
ARGS=-t [ reactify --es6 --everything --visitors jstransform/visitors/es6-destructuring-visitors ]

js:
	browserify ${ARGS} -d run.js -o www/react-demobox.js

less:
	lessc less/theme.less build/theme.css
	lessc less/index.less build/react-demobox.css

colors:
	mkdir -p build/themes
	cd less && node colors.js

pages:
	mkdir -p pages/demobox
	rsync build/* -r pages/demobox

gen:
	./bin/demobox

.PHONY: less js pages
