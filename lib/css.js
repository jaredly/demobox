import RCSS from 'rcss'

export default function css(spec, ...inserts) {
  const sections = parse(spec, inserts)
  const decs = {}
  const styles = {}
  for (let name in sections) {
    decs[name] = RCSS.registerClass(sections[name])
    styles[name] = decs[name].className
  }
  return {decs, styles}
}

function groups(defn) {
  const decs = {}
  const styles = {}
  for (let group in defn) {
    const sections = defn[group]
    decs[group] = {}
    styles[group] = {}
    for (let name in sections) {
      decs[group][name] = RCSS.registerClass(sections[name])
      styles[group][name] = decs[group][name].className
    }
  }
  return {decs, styles}
}

css.groups = groups

function assign(dest, obj) {
  for (let name in obj) {
    dest[name] = obj[name]
  }
}

function parse(texts, inserts) {
  let sections = {}
  let pedigree = []

  texts.forEach((text, ti) => {
    let lines = text.split('\n').map(m => m.trim())
    lines.forEach((line, i) => {
      if (!line) return
      if (line[line.length - 1] === '{') {
        const name = line.slice(0, -1).trim()
        const section = {}
        if (!pedigree.length) {
          sections[name] = section
        } else {
          pedigree[0][name] = section
        }
        return pedigree.unshift(section)
      }
      if (line === '}') {
        return pedigree.shift()
      }
      if (line[0] === '@') {
        return assign(pedigree[0], sections[line.slice(1).trim()])
      }
      if (line.indexOf(':') === -1) {
        debugger
        throw new Error('Invalid syntax: ' + line)
      }
      let parts = line.split(':')
      pedigree[0][toJS(parts[0])] = parts.slice(1).join(':')
    })

    if (inserts[ti]) {
      if (pedigree.length) {
        for (let name in inserts[ti]) {
          if ('object' === typeof pedigree[0][name]) {
            pedigree[0][name] = RCSS.cascade(pedigree[0][name], inserts[ti][name])
          } else {
            pedigree[0][name] = inserts[ti][name]
          }
        }
      } else {
        for (let name in inserts[ti]) {
          sections[name] = inserts[ti][name]
        }
      }
    }
  })
  return sections
}

function toJS(name) {
  return name.replace(/-\w/g, m => m.slice(1).toUpperCase())
}
