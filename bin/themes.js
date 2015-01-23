var names = ["Red", "Pink", "Purple", "Deep Purple", "Indigo", "Blue",
  "Light Blue", "Cyan", "Teal", "Green", "Light Green", "Lime", "Yellow",
  "Amber", "Orange", "Deep Orange", "Brown", "Grey", "Blue Grey"]
var main = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
  "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
  "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"]
var lightest = ["#ffebee", "#fce4ec", "#f3e5f5", "#ede7f6", "#e8eaf6",
  "#e3f2fd", "#e1f5fe", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7",
  "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1",
  "#ffffff"]
var accent = ["#b71c1c", "#880e4f", "#4a148c", "#311b92", "#1a237e",
  "#0d47a1", "#01579b", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717",
  "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"]
var accentLight = ["#d32f2f", "#c2185b", "#7b1fa2", "#512da8", "#303f9f",
  "#1976d2", "#0288d1", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b",
  "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"]
var colors = {}

for (var i=0; i<main.length; i++) {
  var name = names[i].toLowerCase().replace(' ', '-')
  colors[name] = {
    main: main[i],
    accent: accent[i],
    lightest: lightest[i],
    accentLight: accentLight[i]
  }
}

function plainFontName(name) {
  return name.split(':')[0].replace(/\+/g, ' ')
}

var fontPairs = [
  ['Alfa+Slab+One', 'Gentium+Book+Basic:400,400italic'],
  ['Fugaz+One', 'Monda'],
  ['Megrim', 'Roboto+Slab:300'],
  ['Montserrat:700', 'Domine'],
  ['Neuton:300'],
  ['Nixie+One', 'Libre+Baskerville'],
  ['Open+Sans+Condensed:700', 'Lora:400italic'],
  ['Open+Sans:800', 'Gentium+Basic:400,400italic'],
  ['Ovo', 'Muli:300'],
  ['Philosopher', 'Muli:300'],
  ['Playfair+Display', 'Fauna+One'],
  ['Quando', 'Judson'],
  ['Quattrocento', 'Fanwood+Text'],
  ['Questrial', 'Old+Standard+TT:400,400italic,700'],
  ['Ultra', 'Slabo+13px'],
  ['Unica+One', 'Vollkorn'],
  ['Vast+Shadow', 'Playfair+Display:400,700,900,400italic,700italic,900italic'],
  ['Vollkorn:700italic,700', 'Exo:400,400italic'],
]

var fonts = fontPairs.reduce(function (fonts, pair) {
  var font = {}
    , name = plainFontName(pair[0])

  font.head= {
    url: pair[0],
    name: name
  }

  if (pair.length === 1) {
    font.body = {
      url: null,
      name: name
    }
  } else {
    font.body = {
      url: pair[1],
      name: plainFontName(pair[1])
    }
  }
  fonts[name.toLowerCase()] = font
  return fonts
}, {})

module.exports = {
  colors: colors,
  fonts: fonts,
}
