<!--
---
title: Demobox
subtitle: Demo Page Generator
styles: demo.css
fontPair: Open Sans
colors: light-green
links:
  Home: index.html
  Demos: demo.html
  Themes: themes.html
  Github: https://github.com/jaredly/demobox

demobox:
- style-min-width: "300px"
---
-->

There are three ways to use demobox, for varying simplicity and flexibility.

# Demo Page Generator

The `demobox` cli tool will turn a regular markdown file with annotated code
snippets into a stylish demo page with editable examples. You can look at the
markdown source for this page
[here](https://github.com/jaredly/demobox/blob/master/Readme.md) as an
example. Also the source for the demo page
([demo.md](https://github.com/jaredly/demobox/blob/master/Readme.md))
showcases a number of features.

```bash
$ npm install -g demobox
$ demobox -i demo.md -o demo.html
```

## `demo.md` (||)

```markdown

---
title: Demobox
extraHead: demo-head.html
styles: demo.css
fontPair: Open Sans
colors: light-green
links:
  Github: http://github.com/jaredly/demobox
---

# First example

``ˋjavascript
// @demobox height=150px
var first = 'javascript code'
  , second = `You can evaluate ${first} with es6 goodness.`;
// the last line must be an expression that results in a react
//  element.
<p>
  <span>{second} </span><br/>
  <strong>JSX is just fine</strong>
</p>
``ˋ

... etc.
```

## `demo.html` rendered page (||)

[![demo page](./demo.png)](demo.html)

## Configuration

- colors: for color names, see [the material UI color list](http://www.google.com/design/spec/style/color.html#color-color-palette)
- fontPair: the font pairings come from [femmebot's](http://github.com/femmebot) [google type project](http://femmebot.github.io/google-type/)

# The `demobox.js` drop-in script

### Included in the `<head>`

```html
<!-- if you want codemirror, that needs to be included separately -->
<script src="https://jaredly.github.io/demobox/demobox.js"></script>
<link rel="stylesheet" href="https://jaredly.github.io/demobox/demobox.css">
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

The `demobox.js` script finds all `textarea`s with the `data-demobox`
attribute and converts them into demoboxes that look like this:

```jsx
// @demobox
// some great code here
var x = <em>element</em>;

<strong>End with a react {x}</strong>
```

Configuration options can be given as `data-*` attributes on the textarea.
Look at the html source of this page (and the demo page) for example usage.

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

