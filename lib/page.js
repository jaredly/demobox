
import React from 'react'

const PT = React.PropTypes

export default function theme2page({
  pageData, themeData, plugins,
  styles, styleString, asset
}) {
  const head = theme2head(themeData.head, styleString, asset)
  const Page = themeData.Page
  const body = React.renderToStaticMarkup(
    <Page
      pageData={pageData}
      plugins={plugins}
      styles={styles}/>
  )
  return theme2html(head, body)
}

function theme2head(head, style, asset) {
  return `
  <title>${head.title}</title>
  <style>${style}</style>
  <meta charset="utf8">
  ${head.scripts.map(s => `<script src="${asset(s)}"></script>`).join('\n  ')}
  ${head.styles.map(s => `<link href="${asset(s)}" rel="stylesheet"/>`).join('\n  ')}
`
}

function theme2html(head, body) {
  return `
<!doctype html>
<html>
  <head>
    ${head}
  </head>
  <body>
    ${body}
  </body>
</html>
`
}

