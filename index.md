title = "React Demobox"
styles = "demo.css"

[demobox]
height = "200px"
style-min-width = "300px"
---

# React Demobox

There are three ways to use demobox, for varying simplicity and flexibility.

## Demobox cmd-line markdown demo page generator

```bash
demobox infile.md outfile.html
```

### `infile.md`


````markdown
#### My Awesomebutton

```jsx
// @demobox
var MyButton = React.createClass({
    getInitialState: function () {
        return {clicked: 0}
    },
    _onClick: function () {
        this.setState({clicked: this.state.clicked + 1})
    },
    render: function () {
        return <button onClick={this._onClick}>
            Hello {this.props.name}!
            {this.state.clicked ?
                ' (clicked ' + this.state.clicked + ' times)' :
                ' click me!'}
        </button>
    }
});

<MyButton name='julie'/>
```

Wasn't that cool?
````

### `outfile.html` rendered page

#### My Awesomebutton

```jsx
// @demobox height=270px
var MyButton = React.createClass({
    getInitialState: function () {
        return {clicked: 0}
    },
    _onClick: function () {
        this.setState({clicked: this.state.clicked + 1})
    },
    render: function () {
        return <button onClick={this._onClick}>
            Hello {this.props.name}!
            {this.state.clicked ?
                ' (clicked ' + this.state.clicked + ' times)' :
                ' click me!'}
        </button>
    }
});

<MyButton name='julie'/>
```

Wasn't that cool?

## react-demobox.js script

Include this in your `<head>`

```html
<!-- if you want codemirror, that needs to be included separately -->
<script src="react-demobox.js"></script>
<link rel="stylesheet" href="react-demobox.css">
```

### Markup in the page

```html
<textarea data-demobox>
// some great code here
var x = 2+2
<strong>End with a react element</strong>
</textarea>
```

### Rendered as a demobox

... put something here

## As a react component

```jsx
// @demobox height=300
var value = `\
var depth = 2
  , es_level = 6;

<span>
    Our depth is now at <strong>{depth}
    demoboxes</strong>, and we
    get <em>es{es_level}
    goodness</em> along with
    our JSX compilation
</span>`;

// Try changing position to left,right or bottom, and codeMirror to false
<DemoBox
    position='top'
    codeMirror={true}
    initialValue={value}/>
```

