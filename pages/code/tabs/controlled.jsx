import { Tabs } from 'components'
import React from 'react'
function ___App() {
  return (
    <Tabs value="1">
      <Tabs.Item label="evil rabbit" value="1">
        The Evil Rabbit Jumped over the Fence.
      </Tabs.Item>
      <Tabs.Item label="jumped" value="2">
        The Fence Jumped over The Evil Rabbit.
      </Tabs.Item>
      <Tabs.Item label="disable" value="3" disabled>
        Hello disable
      </Tabs.Item>
    </Tabs>
  )
}
export default ___App
