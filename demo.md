---
title: Demobox Demos
subtitle: Getting rather meta
fontPair: Open Sans
colors: light-green
links:
  Home: index.html
  Demos: demos.html
  Themes: themes.html
  Github: https://github.com/jaredly/demobox
---

Check out [the source for this page](https://github.com/jaredly/demobox/blob/master/demo.md)) and [the source for the home page](https://github.com/jaredly/demobox/blob/master/Readme.md) for extended examples of using `demobox` page generator.

This page demonstrates some of the configuration for the `DemoBox` component.

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

### Using `demobox` cli (||)

````markdown
```javascript
// @demobox
var first = 'javascript code'
    , second = `You can evaluate ${first} with es6 goodness.`;
// the last line must be an expression that results in a react
//  element.
<p>
    <span>{second} </span>
    <strong>JSX is just fine</strong>
</p>
```
````

### Using `demobox.js` drop-in script (||)

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

<DemoBox
  initialValue={initialValue}
  position='top'/>
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
                // code here
                <span>
                  <strong>[render target] </strong>
                  This demo box one has a render target
                  that is external, in a different
                  cell of this table
                </span>
            </textarea>
        </td>
        <td>
            <h3>Source HTML</h3>
<pre><code class="html">&lt;textarea data-demobox data-target="#id-of-target"&gt;
// code here
&lt;span>
  &lt;strong>[render target] &lt;/strong>
  This demo box one has a render target
  that is external, in a different
  cell of this table
&lt;/span>
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

