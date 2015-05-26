// React Demobox

var React = require('react')
  , PT = React.PropTypes

  , jsx = require('./jsx')
  , CodeMirrorRx = require('./codemirror-rx')

var defaultCode = `\
var name = 'Lisa';

<div>
  Hello <strong>{name}</strong>!
</div>`

var DemoBox = React.createClass({
  propTypes: {
    initialValue: PT.string,
    codeMirror: PT.bool,
    position: PT.oneOf(['top', 'bottom', 'left', 'right']),
    outputNode: PT.object,
  },

  getDefaultProps: function () {
    return {
      initialValue: defaultCode,
      header: true,
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
          maxWidth: horizontal ? '500px' : '100%',
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

    var header = <div className="DemoBox_head">
      <a target="_blank" href="https://jaredly.github.io/react-demobox">DemoBox</a>
    </div>;
    if (this.props.outputNode) {
      return <div className='DemoBox'>
        <div className='DemoBox_text'>
          {!!this.props.header && header}
          {text}
          {this.state.error ? <div className='DemoBox_error'>{this.state.error}</div> : null}
        </div>
      </div>
    }

    return <div className={'DemoBox DemoBox-' + this.props.position}>
      <div ref="output" style={{flex: 1}} className='DemoBox_output'/>
      <div className='DemoBox_text'>
        {!!this.props.header && header}
        {text}
        {this.state.error ? <div className='DemoBox_error'>{this.state.error}</div> : null}
      </div>
    </div>
  }
})

module.exports = DemoBox
