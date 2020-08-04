import { Tabs } from 'components'
function Bottom({ color, className }) {
  return <div className={className} 

  style={{ height: 5, background: color,borderRadius:'100%' }}></div>
}

export default function App() {
  return (
    <Tabs initialValue="1" Bottom={Bottom}>
      <Tabs.Item label="evil rabbit" value="1">
        The Evil Rabbit Jumped over the Fence.
      </Tabs.Item>
      <Tabs.Item label="jumped" value="2">
        The Fence Jumped over The Evil Rabbit.
      </Tabs.Item>
    </Tabs>
  )
}
