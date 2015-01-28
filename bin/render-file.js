
var fs = require('fs')
  , getConfig = require('./get-config')
  , utils = require('./render-utils')

module.exports = renderFile

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

  var theme = utils.getTheme(config)

  var top = fs.readFileSync(__dirname + '/top.html', 'utf8')
    , bottom = fs.readFileSync(__dirname + '/bottom.html', 'utf8')
    , body = require('./render')(raw, config)
    , cdn = config.cdn ? 'https://jaredly.github.io/demobox/' : ''

  top = utils.format(top, {
    title: config.title,
    subtitle: config.subtitle,
    links: utils.makeLinks(config.links),

    cdn: cdn,

    'font-imports': theme.fonts.imports,
    'font:head': theme.fonts.head.name,
    'font:body': theme.fonts.body.name,

    css: config.css,
    js: config.js,

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

  bottom = utils.format(bottom, {
    ga: utils.makeGoogleAnalytics(config.ga),
    'source-line': config.source && '<p>view the <a href="' + config.source + '">markdown source</a> for this page</p>',
  })

  fs.writeFileSync(outName, top + body + bottom)
}

