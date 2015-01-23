
var renderFile = require('../bin/render-file')
  , themes = require('../bin/themes')
  , fs = require('fs')

var colors = Object.keys(themes.colors)
  , fonts = Object.keys(themes.fonts)
  , num = Math.max(colors.length, fonts.length)
  , themeNames = []

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

  themeNames.push({
    name: outName.slice(0, -5),
    colors: color,
    headFont: themes.fonts[font].head.name,
    bodyFont: themes.fonts[font].body.name,
  })
}

fs.writeFileSync(__dirname + '/../themes.md', mdFile(themeNames))

function mdFile(themes) {
  var text = fs.readFileSync(__dirname + '/md-top.md')
  text += '\n<section class="themes-list">'
  themes.forEach(function (theme) {
    text += '<div class="theme">\n  <a href="theme_pics/' + theme.name + '.png"><img src="theme_pics/' + theme.name + '.png"/></a>\n  <table><thead>'
    text += '\n    <tr><th>Colors</th><th>Head</th><th>Body</th></tr>'
    text += '\n    </thead><tbody><tr>'
    text += '\n    <td>' + theme.colors + '</td>'
    text += '\n    <td>' + theme.headFont + '</td>'
    text += '\n    <td>' + theme.bodyFont + '</td>'
    text += '\n  </tbody></table>\n</div>\n\n'
  })
  text += '\n</section>'
  return text
}
