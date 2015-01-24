
ARGS=-t [ reactify --es6 --everything --visitors jstransform/visitors/es6-destructuring-visitors ]

js:
	browserify ${ARGS} -d run.js -o build/demobox.js

js-xreact:
	browserify ${ARGS} -d run.js -x react -o build/demobox-xreact.js

react:
	browserify -r react -r react/addons -o build/react.js

less:
	lessc less/theme.less build/theme.css
	lessc less/index.less build/demobox.css

colors:
	mkdir -p build/themes
	cd less && node colors.js

pages:
	mkdir -p pages
	rsync build/* -r pages

gh-pages: pages
	cd pages && git add . && git commit -am'update pages' && git push

# depends on slimerjs
gen-themes:
	mkdir -p scripts/tmp
	rsync build/* scripts/tmp
	node scripts/make-themes.js
	python scripts/make-themes.py
	mv scripts/tmp/*.png pages/theme_pics
	node scripts/md-gen.js

md-gen:
	node scripts/md-gen.js

gen-demo:
	slimerjs scripts/main-demo.js

index:
	./bin/demobox -i Readme.md -o pages/index.html --no-cdn

themes:
	./bin/demobox --no-cdn -i themes.md -o pages/themes.html

demo:
	./bin/demobox --no-cdn -o pages/demo.html

.PHONY: less js pages
