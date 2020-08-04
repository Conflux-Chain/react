import React from 'react'
import { Tabs, Spacer, Text } from 'components'
function App() {
  const [value, setValue] = React.useState('1')
  return (
    <div>
      <Text span>Current Tab: </Text>{' '}
      <Text type="success" span>
        {value}{' '}
      </Text>
      <Spacer y={1} />
      <Tabs initialValue={value} onChange={setValue}>
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
