---
title: React Demobox
styles: demo.css
repo: https://github.com/jaredly/react-demobox
fontPair: Open Sans

demobox:
- style-min-width: "300px"
---

There are three ways to use demobox, for varying simplicity and flexibility.

# cli demo page generator

The `demobox` cli tool will turn a regular markdown file with annotated code
snippets into a stylish demo page with editable examples. You can look at the
markdown source for this page [here](/index.md).

```bash
demobox -i infile.md -o outfile.html
```

## `infile.md` (<<)

````markdown
title = "Awesomebutton Demo"
repo = "http://github.com/jaredly/awesomebutton"
scripts = "awesomebutton.js"

[demobox]
height = "100px"
---

# Default Options

```jsx
// @demobox
<MyButton name='julie'/>
```

# Extra Large

```jsx
// @demobox
<MyButton large={true}/>
```
````

## `outfile.html` rendered page

![example shot](./example-shot.png)

## Configuration

- colors: for color names, see [the material UI color list](http://www.google.com/design/spec/style/color.html#color-color-palette)
- fontPair: the font pairings come from [femmbot's](http://github.com/femmbot) [google type project](http://femmebot.github.io/google-type/)

# react-demobox.js script

Include this in your `<head>`

```html
<!-- if you want codemirror, that needs to be included separately -->
<script src="react-demobox.js"></script>
<link rel="stylesheet" href="react-demobox.css">
```

## Markup in the page

```html
<textarea data-demobox>
// some great code here
var x = 2+2
<strong>End with a react element {x}</strong>
</textarea>
```

## Rendered as a demobox

```jsx
// @demobox
// some great code here
var x = 2+2;
<strong>End with a react element {x}</strong>
```

# As a react component

```jsx
// @demobox
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

// Try changing position to left, right
// or bottom, and codeMirror to false
<DemoBox
    position='top'
    codeMirror={true}
    initialValue={value}/>
```

