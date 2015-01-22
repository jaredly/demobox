
var names = ["Red", "Pink", "Purple", "Deep Purple", "Indigo", "Blue", "Light Blue", "Cyan", "Teal", "Green", "Light Green", "Lime", "Yellow", "Amber", "Orange", "Deep Orange", "Brown", "Grey", "Blue Grey"]
var main = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"]
var accent = ["#b71c1c", "#880e4f", "#4a148c", "#311b92", "#1a237e", "#0d47a1", "#01579b", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"]
var accentLight = ["#d32f2f", "#c2185b", "#7b1fa2", "#512da8", "#303f9f", "#1976d2", "#0288d1", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"]

var themes = []

var fs = require('fs')
var tpl = fs.readFileSync('./tpl.less', 'utf8')
var less = require('less')

function save(filename, err, text) {
  if (err) return console.error('Failed to compile ' + filename, err)
  fs.writeFileSync(filename, text.css)
}

for (var i=0; i<main.length; i++) {
  var text = format(tpl, {
    main: main[i],
    accent: accent[i],
    accentLight: accentLight[i]
  })
  var name = names[i].toLowerCase().replace(' ', '-')
  less.render(text, {
    paths: ['.'], compress: true, filename: name
  }, save.bind(null, '../build/themes/' + name + '.css'))
}

function format(str, dct) {
  return str.replace(/{([^}\n]+)}/g, function (full, name) {
    if (undefined === dct[name]) return ''
    return dct[name]
  })
}

