
var marked = require('marked')

module.exports = function (raw, config) {
  var rend = new marked.Renderer()
  rend._demobox_headlevel = []
  rend.code = require('./render-code').bind(null, rend, config.demobox)

  rend.heading = function (title, level) {
    var l = rend._demobox_headlevel
      , text = ''
    while (l.length && l[l.length-1] >= level) {
      text += '</section>\n'
      l.pop()
    }
    l.push(level)
    var collapsed = title.match(/\((&lt;&lt;|&gt;&gt;)\)\s*$/)
    if (collapsed) {
      title = title.slice(0, -collapsed[0].length).trim()
      text += '\n<a name="' + title + '"></a>'
      text += '\n<section data-collapsible ' +
        (collapsed[1] === '&lt;&lt;' ? 'class="collapsed"' : '') + '>\n'
    } else {
      text += '\n<a name="' + title + '"></a>'
      text += '\n<section>\n'
    }
    text += '<h' + level + '>' +
      '<a href="#' + title + '">' +
      title +
      '</a></h' + level + '>\n'
    return text
  }

  var body
  try {
    body = marked(raw, {renderer: rend})
  } catch (e) {
    console.log('Failed to render markdown!')
    console.log(e.message + '\n' + e.stack)
    process.exit(1)
  }

  return body
}

