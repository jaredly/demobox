---
title: React Demobox
styles: demo.css
fontPair: Open Sans
links:
  Demos: demo.html
  Themes: themes.html
  Github: https://github.com/jaredly/react-demobox

demobox:
- style-min-width: "300px"
---

There are three ways to use demobox, for varying simplicity and flexibility.

# cli demo page generator

The `demobox` cli tool will turn a regular markdown file with annotated code
snippets into a stylish demo page with editable examples. You can look at the
markdown source for this page [here](/index.md).

```bash
$ npm install -g demobox
$ demobox -i demo.md -o demo.html
```

## `demo.md` (||)

```markdown

---
title: React Demobox
extraHead: demo-head.html
styles: demo.css
repo: http://github.com/jaredly/react-demobox
fontPair: Open Sans

demobox:
- height: 200px
---

# First example

``\`javascript
// @demobox height=150px
var first = 'javascript code'
  , second = `You can evaluate ${first} with es6 goodness.`;
// the last line must be an expression that results in a react
//  element.
<p>
  <span>{second} </span><br/>
  <strong>JSX is just fine</strong>
</p>
``\`

... etc.
```

## `demo.html` rendered page (||)

<a target="_blank" href="demo.html"><img src="./demo.png" width="100%"/></a>

## Configuration

- colors: for color names, see [the material UI color list](http://www.google.com/design/spec/style/color.html#color-color-palette)
- fontPair: the font pairings come from [femmebot's](http://github.com/femmebot) [google type project](http://femmebot.github.io/google-type/)

# react-demobox.js script

### Included in the `<head>`

```html
<!-- if you want codemirror, that needs to be included separately -->
<script src="react-demobox.js"></script>
<link rel="stylesheet" href="react-demobox.css">
```

### Markup in the page

```html
<textarea data-demobox>
// some great code here
var x = <em>element</em>;

<strong>End with a react {x}</strong>
</textarea>
```

### Rendered as a demobox

The `react-demobox.js` script finds all `textarea`s with the `data-demobox`
attribute and converts them into demoboxes that look like this:

```jsx
// @demobox
// some great code here
var x = <em>element</em>;

<strong>End with a react {x}</strong>
```

# As a react component

```jsx
// @demobox
var value = `\
<strong>
  It's demoboxes all the way down...
</strong>
`;

// Try changing position to left, right
// or top, and codeMirror to false
<DemoBox
    position='bottom'
    header={true}
    style={{width: 360}}
    codeMirror={true}
    initialValue={value}/>
```

