export default function (str) {
  return str
    .split('\n')
    .filter(line => !(line.startsWith('import') || line.startsWith('export')))
    .join('\n')
}
