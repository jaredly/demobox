
import yaml from 'yamlish'

const COM_START = '<!--\n---\n'
const COM_END = '\n---\n-->\n'
const REG_START = '---\n'
const REG_END = '\n---\n'

export default function parseData(raw) {
  let meta, text
  if (raw.indexOf(COM_START === 0)) {
    const end = raw.indexOf(COM_END)
    meta = raw.slice(COM_START.length, end)
    text = raw.slice(end + COM_END.length)
  } else if (raw.indexOf(REG_START) !== 0) {
    throw new Error("page doesn't have metadata to start")
  } else {
    const end = raw.indexOf(REG_END)
    meta = raw.slice(REG_START.length, end)
    text = raw.slice(end + REG_END.length)
  }
  const data = yaml.decode('\n' + meta + '\n')
    /*
  console.log(meta)
  console.log('parsed meta')
  console.log(JSON.stringify(data, null, 2))
  */

  data.body = text
  return data
}

