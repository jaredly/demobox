#!/usr/bin/env slimerjs

var page = require('webpage').create()
  , name = phantom.args[0]

if (!name) {
  console.log('usage: theme-demo.js nameoffile // without the .html extension')
  slimer.exit()
}

page.viewportSize = {width: 1100, height: 1000}
page.clipRect = {top: 0, left: 0, width: 1100, height: 550}

page.open('file://' + phantom.libraryPath + '/tmp/' + name + '.html', function () {
    page.render(phantom.libraryPath + '/tmp/' + name + '.png')
    slimer.exit()
})

