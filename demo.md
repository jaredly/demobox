title = "React Demobox"
extraHead = "demo-head.html"
styles = "demo.css"
repo = "http://github.com/jaredly/react-demobox"
fontPair = "Open Sans"

[demobox]
height = "200px"
---

# First example

```javascript
// @demobox height=150px
var first = 'javascript code'
	, second = `You can evaluate ${first} with es6 goodness.`;
// the last line must be an expression that results in a react
//  element.
<p>
	<span>{second} </span><br/>
	<strong>JSX is just fine</strong>
</p>
```

## The source for this demo (<<)

### In the `<head>`

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/4.11.0/codemirror.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/4.11.0/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/4.11.0/mode/javascript/javascript.min.js"></script>
<script src="react-demobox.js"></script>
```

### In the `<body>`

```html
<textarea data-demobox>
var first = 'javascript code'
    , second = `You can evaluate ${first} with es6 goodness.`;
// the last line must be an expression that results in a react
//  element.
<p>
    <span>{second} </span>
    <strong>JSX is just fine</strong>
</p>
</textarea>
```

# Slightly larger example

The rest of these examples will show demobox-in-demobox, to make things
easier.

```jsx
// @demobox
var initialValue=`\
var name = 'Sara'
var NameComponent = React.createClass({
    render: function () {
    return <span>
        Hello <strong>{this.props.name}</strong>
    </span>
    }
});
<NameComponent name={name}/>`;

<DemoBox initialValue={initialValue} position='top'/>
```

# Other Positions

The "position" argument allows you to specify where the output should
be displayed. Default is "right".

```jsx
// @demobox width=300
<div>
    <DemoBox position='top'/>
    <hr/>
    <DemoBox position='left'/>
    <hr/>
    <DemoBox/>
    <hr/>
    <DemoBox position='bottom'/>
</div>
```

# Without CodeMirror (just uses a text box)

```jsx
// @demobox
<DemoBox position='top' codeMirror={false}/>
```

# Advanced Usage: External Output Node

<table>
    <tr>
        <td>
            <textarea
                data-demobox
                data-style-width="500px"
                data-style-height="200px"
                data-target="#second-target">
                <span>This demo box one has a render target that is external, in a
                different cell of this table</span>
            </textarea>
        </td>
        <td>
            <h3>Source HTML</h3>
<pre><code class="language-html">&lt;textarea data-demobox data-target="#id-of-target"&gt;
... code ...
&lt;/textarea&gt;</code></pre>
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            <div id="second-target"></div>
        </td>
    </tr>
</table>

