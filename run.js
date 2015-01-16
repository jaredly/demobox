
var React = require('react')
  , DemoBox = require('./')

document.addEventListener('DOMContentLoaded', () => {
  [].map.call(document.querySelectorAll('[data-demobox]'), makeBox)
})

module.exports = makeBoxFromNode

function makeBox(node, options) {
  var div = document.createElement('div')
  node.parentNode.replaceChild(div, node)
  React.render(React.createElement(DemoBox, options), div)
}

function unIndent(text) {
  var lines = text.split('\n')
    , min = text.length
  lines.forEach(line => {
    if (!line.trim().length) return
    var white = /^ */.exec(line)[0].length
    console.log(white, line)
    if (white < min) min = white
  })
  return lines.map(line => line.slice(min)).join('\n')
}

function makeBoxFromNode(node) {
  var style = {}
  [].map.call(node.attributes, attr => {
    if (attr.name.indexOf('data-style-') !== 0) return
    style[attr.name.slice('data-style-'.length)] = attr.value
  })
  var target = node.getAttribute('data-target')
  if (target) {
    target = document.querySelector(target)
  }

  makeBox(node, {
    outputNode: target,
    value: unIndent(node.value || node.innerHTML),
    position: node.getAttribute('data-position'),
    codeMirror: ['0', 'false'].indexOf(node.getAttribute('data-code-mirror')) === -1,
    style: style,
  })
}


