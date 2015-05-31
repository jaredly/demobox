
import path from 'path'

export default class NavLinks {
  constructor() {
    this.nav = null
  }

  postProcessFiles(files) {
    this.nav = walkFiles(files)
  }

  page(pageData, curpath) {
    const parts = curpath.slice(1).split('/')
    const nav = walkBack(this.nav, parts, path.dirname(curpath))
    return {
      links: nav
    }
  }
}

function walkFiles(files, path) {
  path = path || ''
  const obj = {
    $type: 'folder',
  }
  for (let name in files) {
    if (name === '$type') continue;
    if (files[name].$type === 'folder') {
      obj[name] = walkFiles(files[name], path + '/' + name)
    } else if (files[name].$type === 'page') {
      obj[name] = {
        path: path + '/' + name,
        $type: 'page',
        title: files[name].title,
        navTitle: files[name].navTitle,
        navIndex: files[name].navIndex,
        navOrder: files[name].navOrder,
        outFileName: files[name].outFileName,
      }
    }
  }
  return obj
}

function walkBack(files, parts, basedir, sub) {
  const obj = {
    $sub: true,
    $open: !!parts,
    $index: path.relative(basedir, files['index.html'].outFileName)
  }
  const names = Object.keys(files)
    .filter(name => {
      if (name === '$type' || (sub && name === 'index.html')) return false
      if (files[name].$type === 'folder') {
        if (!files[name]['index.html']) {
          console.log('Folder without an index.md', name)
          return false
        }
      } else if (files[name].$type !== 'page') return false
      return true
    })

  names.sort((a, b) => {
    const aI = files[a]
    const bI = files[b]
    const aD = aI.$type === 'folder' ? aI['index.html'].navIndex : aI.navIndex
    const bD = bI.$type === 'folder' ? bI['index.html'].navIndex : bI.navIndex
    return aD - bD
  })

  names.forEach(name => {
    const item = files[name]
    const subparts = parts && parts[0] === name ? parts.slice(1) : null
    if (item.$type === 'folder') {
      obj[item['index.html'].navTitle || item['index.html'].title] = walkBack(item, subparts, basedir, true)
      return
    }
    const title = item.navTitle || item.title
    if (subparts !== null) {
      obj[title] = true
    } else {
      obj[title] = path.relative(basedir, item.outFileName)
    }
  })
  return obj
}

