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
      initialValue: '<strong>Hello</strong> <em>React!</em>',
      codeMirror: true,
      position: 'top',
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
      this.setState({value: this.props.intialValue})
    }
    if (prevState.value === this.state.value) return;
    this._renderDemo()
  },
  _renderDemo: function () {
    var comp;
    try {
      comp = eval(jsx(this.state.value))
    } catch (e) {
      return this.setState({error: 'Failed to evail: ' + e.message})
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
    if (this.props.codeMirror) {
      text = <CodeMirrorRx
        value={this.state.value}
        onChange={this._onChange}
        smartIntent={false}
        lineWrap={true}
        style={this.props.style}
        automatchparens={true}/>
    } else {
      text = <textarea value={this.state.value} onChange={e => this._onChange(e.target.value)}/>
    }
    if (this.props.outputNode) {
      return <div className='DemoBox'>
        <div className='DemoBox_text'>
          {text}
          {this.state.error ? <div className='DemoBox_error'>{this.state.error}</div> : null}
        </div>
      </div>
    }

    return <div className='DemoBox' style={{
      display: 'flex',
      flexDirection: {
        'left': 'row',
        'right': 'row-reverse',
        'top': 'column',
        'bottom': 'column-reverse',
      }[this.props.position]
    }}>
      <div ref="output"/>
      <div className='DemoBox_text'>
        {text}
        {this.state.error ? <div className='DemoBox_error'>{this.state.error}</div> : null}
      </div>
    </div>
  }
})

