
var NavLinks = require('./plugins/nav-links')

var path = require('path')

module.exports = {
  source: './docs',
  dest: './pages',
  theme: require('./themes/default'),
  themeConfig: {
    fontPair: 'open sans',
    colorSwatch: 'light-green',
  },
  plugins: [
    require('./plugins/google-analytics')('UA-7002862-5'),
    new NavLinks(),
    require('./plugins/extra-links')({
      Github: 'https://github.com/jaredly/demobox',
    }),
    require('./plugins/readme')(
      '../Readme.md'
    ),
    require('./plugins/view-source')(
      'https://github.com/jaredly/demobox/blob/master/docs/',
    ),
  ],
}

