export default function (str) {
  str = str
    .split('\n')
    .filter(line => !(line.startsWith('import') || line.startsWith('export')))
    .join('\n')

  if (str.indexOf('___App') > -1) {
    const returnIdx = str.indexOf('return')
    const lastParasis = str.lastIndexOf(')')
    str = str.slice(returnIdx + 6, lastParasis + 1)
  }


  return str
}