
var fs = require('fs')
  , getConfig = require('./get-config')

module.exports = renderFile

function format(str, dct) {
  return str.replace(/{([^}]+)}/g, function (full, name) {
    if (undefined === dct[name]) return ''
    return dct[name]
  })
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

  var top = fs.readFileSync(__dirname + '/top.html', 'utf8')
    , bottom = fs.readFileSync(__dirname + '/bottom.html', 'utf8')
    , body = require('./render')(raw, config)

  top = format(top, {
    title: config.title,
    repo: config.repo,
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

