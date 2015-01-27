
var React = require('react')
  , DemoBox = require('./')

module.exports = makeBoxFromNode

document.addEventListener('DOMContentLoaded', () => {
  ;[].map.call(document.querySelectorAll('[data-demobox]'), makeBoxFromNode)
  ;[].map.call(document.querySelectorAll('[data-collapsible]'), makeCollapsible)
})

function makeCollapsible(node) {
  node.firstElementChild.addEventListener('click', function () {
    node.classList.toggle('collapsed')
  })
}

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
    if (white < min) min = white
  })
  return lines.map(line => line.slice(min)).join('\n')
}

function getNodeValue(node) {
  if (node.value) return node.value
  return node.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

function makeBoxFromNode(node) {
  var style = {}
  ;[].map.call(node.attributes, attr => {
    if (attr.name.indexOf('data-style-') !== 0) return
    style[attr.name.slice('data-style-'.length)] = attr.value
  })
  var target = node.getAttribute('data-target')
  if (target) {
    target = document.querySelector(target)
  }
  style.height = node.getAttribute('height') || style.height
  style.width = node.getAttribute('width') || style.width

  var initialValue = unIndent(getNodeValue(node))

  makeBox(node, {
    outputNode: target,
    initialValue: initialValue,
    position: node.getAttribute('data-position') || 'right',
    codeMirror: ['0', 'false'].indexOf(node.getAttribute('data-code-mirror')) === -1,
    style: style,
  })
}


