import { Navigation, Button, Spacer } from 'components'
function App() {
  return (
    <div>
      <Spacer y={1} />
      <Navigation
        before={<Button>Before</Button>}
        after={<Button>After</Button>}
        initialValue="1"
        items={[
          {
            label: (
              <a style={{ color: 'unset', cursor: 'unset' }} href="#">
                AA
              </a>
            ),
            to: '1',
          },
          {
            label: (
              <a style={{ color: 'unset', cursor: 'unset' }} href="#">
                BB
              </a>
            ),
            to: '2',
          },
          {
            label: (
              <a style={{ color: 'unset', cursor: 'unset' }} href="#">
                CC
              </a>
            ),
            to: '3',
            disabled: true,
          },
        ]}></Navigation>
      <Spacer y={1} />
      <Navigation
        varient="solid"
        before={<Button>Before</Button>}
        after={<Button>After</Button>}
        initialValue="1"
        items={[
          {
            label: (
              <a style={{ color: 'unset', cursor: 'unset' }} href="#">
                AA
              </a>
            ),
            to: '1',
          },
          {
            label: (
              <a style={{ color: 'unset', cursor: 'unset' }} href="#">
                BB
              </a>
            ),
            to: '2',
          },
          {
            label: (
              <a style={{ color: 'unset', cursor: 'unset' }} href="#">
                CC
              </a>
            ),
            to: '3',
            disabled: true,
          },
        ]}></Navigation>
    </div>
  )
}
export default App

export const titleEN = `Default`
export const titleZH = `默认`
export const descEN = `Displays navigation of different form `
export const descZH = `展示导航栏的不同状态`

export default App
