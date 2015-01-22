
var toml = require('toml')
  , deepcopy = require('deepcopy')

module.exports = getConfig

module.exports.DEFAULTS = {
  title: 'Demo Page',
  repo: '',
  theme: '',
  styles: [],
  scripts: [],
  extraHead: [],
  bodyTop: [],
  demobox: {
    height: 150,
    output: true,
    position: "right",
  },
}

function getConfig(text) {
  var config = deepcopy(module.exports.DEFAULTS)
  var parsed
  try {
    parsed = toml.parse(text)
  } catch (e) {
    console.log('Failed to parse config at top of file.')
    process.exit(2)
  }
  for (var name in config) {
    if (undefined === parsed[name]) continue
    if (Array.isArray(config[name])) {
      if ('string' === typeof parsed[name]) {
        config[name].push(parsed[name])
      } else if (Array.isArray(parsed[name])) {
        config[name] = config[name].concat(parsed[name])
      } else {
        console.log('Unknown value for ' + name + ' in config')
      }
    } else if ('object' === typeof config[name]) {
      for (var sub in parsed[name]) {
        config[name][sub] = parsed[name][sub]
      }
    } else {
      config[name] = parsed[name]
    }
  }
  return config
}

