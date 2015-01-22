
var fs = require('fs')
  , getConfig = require('./get-config')

module.exports = renderFile

function format(str, dct) {
  return str.replace(/{([^}]+)}/g, function (full, name) {
    if (undefined === dct[name]) return ''
    return dct[name]
  })
}

function getThemeForTitle(title) {
  var total = [].map.call(title, function (a) {return a.charCodeAt(0)}).reduce(function (a, b) {return a+b}, 0);
  var themes = fs.readdirSync(__dirname + '/../build/themes')
  console.log(themes)
  return themes[total % themes.length].slice(0, -4)
}

function renderFile(fileName, outName) {

  var raw = fs.readFileSync(fileName).toString('utf8')
  var parts = raw.split('\n---\n')
    , config
  if (parts.length === 1) {
    config = getConfig.DEFAULTS
  } else {
    config = getConfig(parts[0])
    raw = parts.slice(1).join('\n---\n')
  }

  if (!config.theme) {
    config.theme = getThemeForTitle(config.title)
    console.log(config.theme)
  }

  var top = fs.readFileSync(__dirname + '/top.html', 'utf8')
    , bottom = fs.readFileSync(__dirname + '/bottom.html', 'utf8')
    , body = require('./render')(raw, config)

  top = format(top, {
    title: config.title,
    repo: config.repo,
    theme: config.theme,
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

  fs.writeFileSync(outName, top + body + bottom)
}

