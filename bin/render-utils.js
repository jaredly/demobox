
var themes = require('./themes')

module.exports = {
  format: format,
  getTheme: getTheme,
  makeLinks: makeLinks,
  makeGoogleAnalytics: makeGoogleAnalytics,
  stripHidden: stripHidden,
}

function stripHidden(text) {
  return text.replace(/^\s*<!--\s*@demobox\s+hide\s*-->\s*\n(.|\n)*?\n\s*<!--\s*@demobox\s+\/hide\s*-->\s*$/gim, '')
}

function format(str, dct) {
  return str.replace(/{([^}\n]+)}/g, function (full, name) {
    if (undefined === dct[name]) return ''
    return dct[name]
  })
}

function chooseByTitle(title, object) {
  var total = [].map.call(title, function (a) {return a.charCodeAt(0)}).reduce(function (a, b) {return a+b}, 0)
    , keys = Object.keys(object)
  return object[keys[total % keys.length]]
}

function fontImports(font) {
  return '<link href="https://fonts.googleapis.com/css?family=' +
    font.head.url + (font.body.url ? '|' + font.body.url : '') + '" rel="stylesheet"/>'
}

function getTheme(config) {
  var theme = {}
  if (config.colors) {
    theme.colors = themes.colors[config.colors.toLowerCase()] || themes.colors.red
  } else {
    theme.colors = chooseByTitle(config.title, themes.colors)
  }

  if (config.fontPair) {
    theme.fonts = themes.fonts[config.fontPair.toLowerCase()] || themes.fonts['open sans']
  } else {
    theme.fonts = chooseByTitle(config.title, themes.fonts)
  }
  theme.fonts.imports = fontImports(theme.fonts)

  return theme
}

function makeLinks(links) {
  return Object.keys(links).map(function (name) {
    return '<a class="link" href="' + links[name] + '">' + name + '</a>'
  }).join('\n')
}

function makeGoogleAnalytics(ga) {
  if (!ga) return ''
  return "<script>\n\
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n\
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n\
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n\
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\
    ga('create', '" + ga + "', 'auto');\n\
    ga('send', 'pageview');\n\
  </script>"
}


