
function plainFontName(name) {
  return name.split(':')[0].replace(/\+/g, ' ')
}

var listOfPairs = [
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

const fontPairs = listOfPairs.reduce(function (fonts, pair) {
  var font = {}
    , name = plainFontName(pair[0])

  font.head = {
    gfont: pair[0],
    name: name
  }

  if (pair.length === 1) {
    font.body = {
      gfont: null,
      name: name
    }
  } else {
    font.body = {
      gfont: pair[1],
      name: plainFontName(pair[1])
    }
  }
  fonts[name.toLowerCase()] = font
  return fonts
}, {})

export default fontPairs

