const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() })

// fix: popperjs generates different jest snapshots on local and ci machine
// https://github.com/popperjs/popper-core/issues/478#issuecomment-407422016
if (global.document) {
  document.createRange = () => ({
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { right: 0 }
    },
    getClientRects: () => [],
    commonAncestorContainer: document.createElement('div'),
  })
}
