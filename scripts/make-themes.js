
var renderFile = require('../bin/render-file')
  , themes = require('../bin/themes')
  , fs = require('fs')

var colors = Object.keys(themes.colors)
  , fonts = Object.keys(themes.fonts)
  , num = Math.max(colors.length, fonts.length)

console.log(colors.length, fonts.length, num)

for (var i=0; i<num; i++) {
  var color = colors[i % colors.length]
    , font = fonts[i % fonts.length]
    , outName = 'theme-' + color + '_' + font + '.html'
  
  console.log(color, font)
  renderFile(__dirname + '/../demo.md', __dirname + '/tmp/' + outName, true, {colors: color, fontPair: font})
  fs.writeFileSync(__dirname + '/tmp/' + outName + '.json', JSON.stringify({
    color: {
      name: color,
      config: themes.colors[color],
    },
    font: {
      name: font,
      config: themes.fonts[font],
    }
  }))
}


