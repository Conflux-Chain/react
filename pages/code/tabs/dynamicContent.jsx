import { Tabs, Spacer, Button } from 'components'

function App() {
  const idx = React.useRef(3)
  const [tabs, setTabs] = React.useState([
    {
      label: 'evil rabbit',
      value: '1',
      deletable: true,
      content: 'The Evil Rabbit Jumped over the Fence.',
    },
    {
      label: 'jumped',
      value: '2',
      content: 'The Fence Jumped over The Evil Rabbit.',
    },
  ])

  return (
    <div>
      <Button
        onClick={() => {
          //   debugger
          setTabs(tabs => {
            console.log(tabs)
            return tabs.concat([
              {
                label: 'new staff',
                value: idx.current++ + '',
                content: 'The Fence Jumped over The Evil Rabbit.',
              },
            ])
          })
        }}>
        Add Item
      </Button>
      <Spacer y={1} />
      <Tabs initialValue="1">
        {tabs.map(({ label, content, value, deletable }) => (
          <Tabs.Item
            key={value}
            label={
              deletable ? (
                <div>
                  {label}{' '}
                  <span
                    onClick={() => {
                      setTabs(tabs => tabs.filter(x => x.value !== value))
                    }}>
                    x
                  </span>
                </div>
              ) : (
                label
              )
            }
            value={value}>
            {content}
          </Tabs.Item>
        ))}
      </Tabs>
    </div>
  )
}

export default App
