
var React = require('react')
  , PT = React.PropTypes

function px(val) {
  if ('number' === typeof val) return val + 'px'
  return val
}

function reactStyle(node, style) {
  var nopx = 'opacity,z-index,zIndex'.split(',')
  for (var name in style) {
    if (nopx.indexOf(name) !== -1) {
      node.style[name] = style[name]
    } else {
      node.style[name] = px(style[name])
    }
  }
}

var CodeMirrorRx = React.createClass({
  getDefaultProps: function () {
    return {
      mode: 'javascript',
    }
  },
  componentDidMount: function () {
    this._cm = new CodeMirror(this.getDOMNode(), this.props)
    if (this.props.onChange) {
      this._cm.on('change', doc => this.props.onChange(doc.getValue()))
    }
    var node = this._cm.getWrapperElement()
    if (this.props.style) {
      reactStyle(node, this.props.style)
      this._cm.refresh()
    }
    setTimeout(() => this._cm.refresh(), 1000)
  },
  componentDidUpdate: function (prevProps) {
    var same = true
    for (var name in this.props) {
      if (this.props[name] !== prevProps[name]) {
        if (name === 'value' && this._cm.getValue() === this.props[name]) continue
        this._cm.setOption(name, this.props[name])
      }
    }
    var node = this._cm.getWrapperElement()
    if (this.props.style) {
      reactStyle(node, this.props.style)
      this._cm.refresh()
    }
  },
  render: function () {
    return <div className='CodeMirrorRx'/>
  }
})

module.exports = CodeMirrorRx
