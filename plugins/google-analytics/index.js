
import React from 'react'

export default uid => pageData => {
  const code = makeGoogleAnalytics(uid)
  return {
    blocks: {
      afterFooter: () => <script dangerouslySetInnerHTML={{__html: code}}/>,
    }
  }
}

function makeGoogleAnalytics(ga) {
  if (!ga) return ''
  return `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', '${ga}', 'auto');
    ga('send', 'pageview');
  `
}


