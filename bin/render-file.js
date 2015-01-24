
var fs = require('fs')
  , getConfig = require('./get-config')
  , themes = require('./themes')

module.exports = renderFile

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

function renderFile(fileName, outName, noCDN, extraConfig) {

  var raw = fs.readFileSync(fileName).toString('utf8')
    , parts = raw.split(/^---$/gm)
    , config
  if (parts.length === 1) {
    config = getConfig.DEFAULTS
  } else {
    // allow for html comments to hide the config
    if (parts[0].trim() === '<!--') {
      parts.shift()
      if (parts[1].trim().slice(0, 3) === '-->') {
        parts[1] = parts[1].trim().slice(3)
      }
    }
    if (!parts[0].trim()) {
      parts.shift()
    }
    config = getConfig(parts[0])
    raw = parts.slice(1).join('\n---\n')
  }

  if (noCDN) {
    config.cdn = false
  }

  for (var name in extraConfig) {
    config[name] = extraConfig[name]
  }

  var theme = getTheme(config)

  var top = fs.readFileSync(__dirname + '/top.html', 'utf8')
    , bottom = fs.readFileSync(__dirname + '/bottom.html', 'utf8')
    , body = require('./render')(raw, config)

  top = format(top, {
    title: config.title,
    subtitle: config.subtitle,
    links: makeLinks(config.links),

    cdn: config.cdn ? 'https://jaredly.github.io/demobox/' : '',
    xreact: config.xreact ? '-xreact' : '',

    'font-imports': theme.fonts.imports,
    'font:head': theme.fonts.head.name,
    'font:body': theme.fonts.body.name,

    'color:main': theme.colors.main,
    'color:lightest': theme.colors.lightest,
    'color:accent': theme.colors.accent,
    'color:accent-light': theme.colors.accentLight,

    scripts: config.scripts.map(function (name) {
      return '<script src="' + name + '"></script>'
    }).join('\n'),
    styles: config.styles.map(function (name) {
      return '<link rel="stylesheet" href="' + name + '">'
    }).join('\n'),
    extraHead: config.extraHead.map(function (name) {
      return fs.readFileSync(name).toString('utf8')
    }).join('\n'),
    bodyTop: config.bodyTop.map(function (name) {
      return fs.readFileSync(name).toString('utf8')
    }).join('\n')
  })

  bottom = format(bottom, {
    ga: makeGoogleAnalytics(config.ga),
  })

  fs.writeFileSync(outName, top + body + bottom)
}

