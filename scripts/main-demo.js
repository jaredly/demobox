#!/usr/bin/env slimerjs

var page = require('webpage').create()

page.viewportSize = {width: 1100, height: 1000}
page.clipRect = {top: 0, left: 0, width: 1100, height: 1250}
page.open('file://' + phantom.libraryPath + '/../pages/demo.html', function () {
  page.render(phantom.libraryPath + '/../pages/demo.png')
  slimer.exit()
})

