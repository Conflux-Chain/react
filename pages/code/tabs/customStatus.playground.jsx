import { Tabs, Spacer, useTheme, Button } from 'components'

function App() {
  const { Label, Bottom } = React.useMemo(
    () => ({
      Label({ varient, status, label }) {
        const { palette } = useTheme()
        const cssProps = {
          borderRadius: '0',
          transition: '200ms',
          height: 44,
          whiteSpace: 'nowrap',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
        }
        if (varient === 'line') {
          cssProps.color = palette.cNeutral5
          if (status === 'hover') {
            cssProps.color = palette.cTheme1
          }
          if (status === 'active') {
            cssProps.color = palette.cTheme5
          }
        }
        if (varient === 'solid') {
          cssProps.color = 'white'
          cssProps.background = palette.cNeutral5
          if (status === 'hover') {
            cssProps.background = palette.cTheme1
            cssProps.color = palette.cTheme5
          }
          if (status === 'active') {
            cssProps.background = palette.cTheme5
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
            <div style={{ marginLeft: 10 }}>{label}</div>
          </div>
        )
      },
      Bottom({ varient, status }) {
        const { palette } = useTheme()
        const cssProps = {
          height: 2,
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }
        if (varient === 'line') {
          if (status === 'hover') {
            cssProps.background = palette.cTheme1
          }
          if (status === 'active') {
            cssProps.background = palette.cTheme5
          }
        }
        return (
          <div
            style={{
              ...cssProps,
            }}></div>
        )
      },
    }),
    [],
  )

  const [varient, setVairent] = React.useState('solid')

  return (
    <div>
      <Button
        onClick={() => {
          setVairent(varient === 'line' ? 'solid' : 'line')
        }}>
        Click to change varient: {varient === 'line' ? 'solid' : 'line'}
      </Button>
      <Spacer y={1} />
      <Tabs
        initialValue="1"
        varient={varient}
        before={
          <Button variant={varient} color="primary" style={{ marginRight: 20 }}>
            Before
          </Button>
        }
        after={
          <Button variant={varient} color="primary" style={{ marginLeft: 20 }}>
            After
          </Button>
        }
        Label={Label}
        Bottom={Bottom}
        showDivider={true}>
        <Tabs.Item label={<div>evil rabbit</div>} value="1"></Tabs.Item>
        <Tabs.Item label="jumped" value="2"></Tabs.Item>
        <Tabs.Item label="disable" value="3" disabled></Tabs.Item>
      </Tabs>
    </div>
  )
}
export default App

export const titleEN = `Customization`
export const titleZH = `定制`
export const descEN = `Label/Bottom can be provided as component and before/after can be provided as element`
export const descZH = `Label/Bottom 可以以 React Component 的方式自定义，
before/after 可以以 React element 的形式自定义`
