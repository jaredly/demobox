// React Demobox

var React = require('react')
  , PT = React.PropTypes

  , jsx = require('./jsx')
  , CodeMirrorRx = require('./codemirror-rx')

var DemoBox = React.createClass({
  propTypes: {
    initialValue: PT.string,
    codeMirror: PT.bool,
    position: PT.oneOf(['top', 'bottom', 'left', 'right']),
    outputNode: PT.object,
  },
  getDefaultProps: function () {
    return {
      initialValue: `\
var name = 'Lisa';

<div>
  Hello <strong>{name}</strong>!
</div>`,
      codeMirror: true,
      position: 'right',
    }
  },
  getInitialState: function () {
    return {
      error: null,
      value: this.props.initialValue,
    }
  },
  componentDidMount: function () {
    this._renderDemo()
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({value: this.props.initialValue})
    }
    if (prevState.value === this.state.value) return;
    this._renderDemo()
  },
  _renderDemo: function () {
    var comp;
    try {
      comp = eval(jsx(this.state.value))
    } catch (e) {
      return this.setState({error: 'Failed to evaluate: ' + e.message})
    }
    if (!comp || !React.isValidElement(comp)) {
      return this.setState({
        error: "It looks like your code doesn't end with a valid react element."
      })
    }
    var node = this.props.outputNode || this.refs.output.getDOMNode();
    try {
      React.render(comp, node)
    } catch (e) {
      return this.setState({error: 'Render failed:' + e.message})
    }
    this.setState({error: null})
  },
  _onChange: function (value) {
    this.setState({value: value})
  },
  render: function () {
    var text
      , horizontal = !this.props.outputNode && ['left', 'right'].indexOf(this.props.position) !== -1
      , style = {
          width: horizontal ? '500px' : '100%',
        }
    for (var name in this.props.style) {
      style[name] = this.props.style[name]
    }
    if (this.props.codeMirror && window.CodeMirror) {
      text = <CodeMirrorRx
        value={this.state.value}
        onChange={this._onChange}
        smartIntent={false}
        lineWrap={true}
        style={style}
        automatchparens={true}/>
    } else {
      text = <textarea
        style={style}
        value={this.state.value}
        onChange={e => this._onChange(e.target.value)}/>
    }
    if (this.props.outputNode) {
      return <div className='DemoBox'>
        <div className='DemoBox_text'>
          {text}
          {this.state.error ? <div className='DemoBox_error'>{this.state.error}</div> : null}
        </div>
      </div>
    }

    var boxStyle = {
      display: 'flex',
      flexDirection: {
        'left': 'row',
        'right': 'row-reverse',
        'top': 'column',
        'bottom': 'column-reverse',
      }[this.props.position],
      justifyContent: {
        'left': 'flex-start',
        'right': 'flex-end',
        'top': 'flex-start',
        'bottom': 'flex-end',
      }[this.props.position],
    }
    return <div className='DemoBox' style={boxStyle}>
      <div ref="output" style={{flex: 1}} className='DemoBox_output'/>
      <div className='DemoBox_text'>
        {text}
        {this.state.error ? <div className='DemoBox_error'>{this.state.error}</div> : null}
      </div>
    </div>
  }
})

module.exports = DemoBox
