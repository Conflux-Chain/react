import { Tabs } from 'components'

function App() {
  const Bottom = React.useMemo(
    () =>
      function Bottom({ color, className }) {
        return (
          <div
            className={className}
            style={{
              height: 10,
              backgroundColor: color,
              backgroundImage:
                'url(data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7)',
            }}></div>
        )
      },
    [],
  )
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

export default App
