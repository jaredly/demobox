
import React from 'react'
import marked from 'marked'

export default page

class Header extends React.Component {
  render() {
    const styles = this.props.styles
    const links = this.props.links
    return <header className={styles.header}>
      <div className={styles.title}>{this.props.title}</div>
      <div className={styles.subTitle}>{this.props.subTitle}</div>
      <Nav styles={styles} links={links}/>
    </header>
  }
}

function makeLinkList(links) {
  return Object.keys(links).map(name => {
    let link = links[name]
    if ('string' === typeof link) {
      link = {
        href: link
      }
    }
    link.text = name
    return link
  })
}

class Nav extends React.Component {
  render() {
    const styles = this.props.styles
    const links = makeLinkList(this.props.links)
    return <ul className={styles.links}>
      {links.map(link => <li className={styles.linkItem}>
        <a className={styles.link} target={link.external ? '_blank' : undefined} href={link.href} title={link.title}>{link.text}</a>
      </li>)}
    </ul>
  }
}

class Footer extends React.Component {
  render() {
    const styles = this.props.styles
    return <div className={styles.footer}>
      Foot me up a thinkg.
      <p>page rendered with <a href="https://jaredly.github.io/demobox">demobox</a></p>
      A line here about "view the source" or some such.
    </div>
  }
}

class Content extends React.Component {
  render() {
    return <div className={'markdown-content ' + this.props.styles.content}
      dangerouslySetInnerHTML={{__html: marked(this.props.text)}}/>
  }
}

function page({title, subtitle, cdn, body, fontFamily, colors, links, sourceLink}, styles) {
  return {
    head: {
      title: title,
      scripts: [
        "codemirror/codemirror.min.js",
        "codemirror/mode/javascript/javascript.min.js",
        "react.js",
        "demobox.js",
      ],
      styles: [
        "codemirror/codemirror.min.css",
        "highlight.js/styles/default.min.css",
        "demobox.css",
        "theme.css",
        "../themes/default/css/markdown.css",
      ],
    },
    body: [
      <Header title={title}
        styles={styles}
        subtitle={subtitle}
        links={links}
        fontFamily={fontFamily}
        colors={colors}/>,
      <Content styles={styles} text={body}/>,
      <Footer styles={styles} sourceLink={sourceLink}/>
      // TODO a google analytics plugin, allow it to add the analytics stuff
      // here
    ]
  }
}

