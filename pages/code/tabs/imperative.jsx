import { Tabs, Spacer, Text, Button } from 'components'

function App() {
  const ref = React.useRef(null)
  const [value, setValue] = React.useState('???')
  return (
    <div>
      <Text span>Tab state after click See current value: </Text>{' '}
      <Text type="success" span>
        {value}
      </Text>
      <Spacer y={1} />
      <Button onClick={() => setValue(ref.current.currentTab())}>Sync Tabs</Button>
      <Button onClick={() => ref.current.currentTab('2')}>Set Tabs Value:2</Button>
      <Spacer y={1} />
      <Tabs initialValue="1" ref={ref}>
        <Tabs.Item label="evil rabbit" value="1">
          The Evil Rabbit Jumped over the Fence.
        </Tabs.Item>
        <Tabs.Item label="jumped" value="2">
          The Fence Jumped over The Evil Rabbit.
        </Tabs.Item>
      </Tabs>
    </div>
  )
}
export default App
