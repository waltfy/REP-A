PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

LESS := styles/rep.less
CSS := public/rep.css

all: test build

# CSS
css: less autoprefix uglifycss

less: ${LESS}
	lessc ${LESS} ${CSS}

autoprefix: ${CSS}
	autoprefixer ${CSS}

uglifycss: ${CSS}
	uglifycss ${CSS} > ${CSS}.min && mv ${CSS}.min ${CSS}

# JS
js: compile minify

compile:
	browserify js/REP.js -o public/REP.js

minify:
	uglifyjs public/REP.js -c -m -o public/REP.min.js

# testing
test:
	echo "should be testing using jest..."

# recipes
dev:
	watchify js/REP.js -v -o public/REP.js

build: js css
