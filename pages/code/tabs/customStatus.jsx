import { Tabs, Spacer, useTheme } from 'components'

function App() {
  const nav = Tabs.nav
  const Label = React.useMemo(
    () =>
      nav({
        Label({ varient, status, label }) {
          const { palette } = useTheme()
          const cssProps = {
            borderRadius: '0',
            transition: '200ms',
            height: 64,
            display: 'flex',
            alignItems: 'center',
          }
          // console.log(varient, status)
          if (varient === 'line') {
            cssProps.color = palette.cNeutral5
            if (status === 'hover') {
              cssProps.color = palette.cTheme5
            }
          }
          return (
            <div style={cssProps}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM14.23 16L10 13.45L5.77 16L6.89 11.19L3.16 7.96L8.08 7.54L10 3L11.92 7.53L16.84 7.95L13.11 11.18L14.23 16Z"
                  fill={cssProps.color}
                />
              </svg>
              <div style={{ marginLeft: 20 }}>{label}</div>
            </div>
          )
        },
        Bottom({ varient, status }) {
          const { palette } = useTheme()
          const cssProps = {
            height: 10,
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }
          if (varient === 'line') {
            if (status === 'hover') {
              cssProps.background = palette.cTheme5
            }
          }
          console.log(cssProps)
          return (
            <div
              style={{
                ...cssProps,

                // opacity: varient === 'line' ? 1 : 0.5,
              }}></div>
          )
        },
      }),
    [],
  )
  return (
    <div>
      <Tabs initialValue="1" Label={Label}>
        <Tabs.Item label={<div>evil rabbit</div>} value="1"></Tabs.Item>
        <Tabs.Item label="jumped" value="2"></Tabs.Item>
        <Tabs.Item label="disable" value="3" disabled></Tabs.Item>
      </Tabs>
      <Spacer y={1}></Spacer>
      <Tabs initialValue="1" varient="solid" Label={Label}>
        <Tabs.Item label="evil rabbit" value="1"></Tabs.Item>
        <Tabs.Item label="jumped" value="2"></Tabs.Item>
        <Tabs.Item label="disable" value="3" disabled></Tabs.Item>
      </Tabs>
    </div>
  )
}
export default App
