import { Navigation, Button } from 'components'
function App() {
  return (
    <Navigation
      before={<Button>Before</Button>}
      initialValue="1"
      items={[
        { label: 'AA', value: '1' },
        { label: 'BB', value: '2' },
        { label: 'CC', value: '3', disabled: true },
      ]}></Navigation>
  )
}
export default App

export const titleEN = `Default`
export const titleZH = `默认`
export const descEN = `Toggle display of different tabs. without caring about the component state`
export const descZH = `切换不同选项卡，使用者无需管理状态`
