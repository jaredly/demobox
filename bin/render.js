
var marked = require('marked')
  , hljs = require('highlight.js')

  , utils = require('./render-utils')

// Synchronous highlighting with highlight.js
marked.setOptions({
  langPrefix: '',
  highlight: function (code, language) {
    if (!language) return hljs.highlightAuto(code).value
    return hljs.highlight(language, code).value;
  }
});

function linkTarget(title) {
  return title.replace(/<[^>]+>/g, '').replace(/\./g, '').replace(/[^\w]/g, '-').toLowerCase()
}

function link(href, title, text) {
  var target = ''
  if (href.indexOf('//') === -1) {
    if (href.slice(-3) === '.md') {
      href = href.slice(0, -3) + '.html'
    }
  } else {
    // external link
    target = ' target="_blank"'
  }
  if (title) {
    title = ' title="' + title + '"'
  } else {
    title = ''
  }
  return '<a href="' + href + '"' + target + title + '>' + text + '</a>'
}

module.exports = function (raw, config) {
  raw = utils.stripHidden(raw)

  var rend = new marked.Renderer()
  rend._demobox_headlevel = []
  rend._demobox_column = false
  rend.code = require('./render-code').bind(null, rend, config.demobox)
  rend.link = link

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
      if (rend._demobox_column == level) {
        rend._demobox_column = false
        text += '\n</section>'
      }
      title = title.slice(0, -collapsed[0].length).trim()
      text += '\n<a name="' + linkTarget(title) + '"></a>'
      text += '\n<section data-collapsible ' +
        (collapsed[1] === '&lt;&lt;' ? 'class="collapsed"' : '') + '>\n'
    } else {
      var column = title.match(/\(\|\|\)\s*$/)
      if (column) {
        if (!rend._demobox_column) {
          rend._demobox_column = level
          text += '\n<section class="columns">'
        }
        title = title.slice(0, -column[0].length).trim()
        text += '\n<a name="' + linkTarget(title) + '"></a>'
        text += '\n<section>\n'
      } else {
        if (rend._demobox_column == level) {
          rend._demobox_column = false
          text += '\n</section>'
        }
        text += '\n<a name="' + linkTarget(title) + '"></a>'
        text += '\n<section>\n'
      }
    }
    text += '<h' + level + '>' +
      '<a href="#' + linkTarget(title) + '">' +
      title +
      '</a></h' + level + '>\n'
    return text
  }

  var body
  try {
    body = marked(raw, {renderer: rend, langPrefix: ''})
  } catch (e) {
    console.log('Failed to render markdown!')
    console.log(e.message + '\n' + e.stack)
    process.exit(1)
  }

  return body
}

