
ARGS=-t [ reactify --es6 --everything --visitors jstransform/visitors/es6-destructuring-visitors ]

js:
	browserify ${ARGS} -d run.js -o build/react-demobox.js

less:
	lessc less/theme.less build/theme.css
	lessc less/index.less build/react-demobox.css

colors:
	mkdir -p build/themes
	cd less && node colors.js

pages:
	mkdir -p pages
	rsync build/* -r pages

index:
	./bin/demobox -i index.md -o pages/index.html --no-cdn

demo:
	./bin/demobox --no-cdn -o pages/demo.html

.PHONY: less js pages
