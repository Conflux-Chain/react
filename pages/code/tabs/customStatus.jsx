import { Tabs, Spacer } from 'components'

function App() {
  const nav = Tabs.nav
  const getColor = React.useCallback(function (palette, varient, status) {
    const cssProps = {
      borderRadius: '0',
      transition: '200ms',
    }
    if (varient === 'line') {
      cssProps.color = palette.error
    } else {
      cssProps.background = palette.error
    }

    if (status === 'disabled') {
      cssProps.color = palette.warning
    }

    if (status === 'hover') {
      cssProps.opacity = '0.8'
    }

    return cssProps
  })
  const Bottom = React.useMemo(
    () =>
      function Bottom({ className, color, varient, status }) {
        return (
          <div
            className={className}
            style={{
              height: 10,
              opacity: varient === 'line' ? 1 : 0.5,
              backgroundColor: color,
              backgroundImage:
                'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAAJ0lEQVQImWNgwAdu1Rh0oQhcz5Nr+zw94P+1fIUOFImLyfzdeI0CADJMCo4cXYDTAAAAAElFTkSuQmCC)',
            }}></div>
        )
      },
    [],
  )

  const Label = React.useMemo(() => nav({ getColor, Bottom }), [])
  return (
    <div>
      <Tabs initialValue="1" Label={Label}>
        <Tabs.Item label={<div>evil rabbit</div>} value="1">
          The Evil Rabbit Jumped over the Fence.
        </Tabs.Item>
        <Tabs.Item label="jumped" value="2">
          The Fence Jumped over The Evil Rabbit.
        </Tabs.Item>
        <Tabs.Item label="disable" value="3" disabled>
          Hello disable
        </Tabs.Item>
      </Tabs>
      <Spacer y={1}></Spacer>
      <Tabs initialValue="1" varient="solid" Label={Label}>
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
    </div>
  )
}
export default App
