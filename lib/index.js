
import RCSS from 'rcss'
import React from 'react'
import path from 'path'
import fs from 'fs'

import css from './css'
import parseData from './parse'

const {styles, decs} = css`
header {
  font-family: Open Sans, sans-serif;
  background-color: #f44336;
  padding: 50px 20px 30px;
  text-align: center;
}
title {
  font-size: 80px;
  color: white;
}
subTitle {
  color: white;
  font-size: 25px;
  margin: -5px 0 10px;
  :empty {
    display: none;
  }
}
linkItem {
  display: inline-block;
  list-style: none;
}
link {
  padding: 5px 10px;
  margin: 0 5px;
  display: inline-block;
  background-color: #b71c1c;
  transition: background-color 0.1s ease;
  color: white;
  border-radius: 5px;
  text-decoration: none;

  :hover {
    background-color: #d32f2f;
  }
}
footer {
  text-align: center;
  font-size: .8em;
  margin-top: 30px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  padding-bottom: 20px;
}
content {
  font-family: Gentium Basic, serif;
  max-width: 1000px;
  margin: 10px auto;
  font-size: 22px;
  padding: 10px 20px 20px;
}
`

export default class Demobox {
  constructor(config) {
    this.config = config
  }

  generate() {
    genFile(path.join(this.config.baseDir, 'Readme.md'), path.join(this.config.baseDir, 'docs', 'index.html'), this.config.theme)
    
    console.log('generatibe')
  }
}

function genFile(infile, outfile, theme) {
  const raw = fs.readFileSync(infile).toString('utf8')
  const data = parseData(raw)
  const themeData = theme(data, styles)
  const html = theme2html(themeData, RCSS.getStylesString())
  fs.writeFileSync(outfile, html)
}

function theme2html({head, body}, style) {
  return `
<!doctype html>
<html>
  <head>
    <title>${head.title}</title>
    <style>${style}</style>
    <meta charset="utf8">
    ${head.scripts.map(s => `<script src="${s}"></script>`).join('\n')}
  ${head.styles.map(s => `<link href="${s}" rel="stylesheet"/>`).join('\n')}
  </head>
  <body>
    ${React.renderToStaticMarkup(<div>{body}</div>)}
  </body>
</html>
`
}

