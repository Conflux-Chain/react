import Tabs, { TabProps } from '../tabs/tabs'
import NavBottom from './navigation-bottom'
import NavLabel from './navigation-label'
import useTheme from '../styles/use-theme'

// throw 'Do not include me'

type ItemType = {
  label: string
  to: string
  disabled?: boolean
}

//onChange suck the data flow, control should NOT come from internal
type NavProps = Omit<TabProps, 'onChange' | 'value' | 'initValue'> & {
  items: ItemType[]
  url: string
  match: (url1: string, url2: string) => boolean
}

const Nav = ({
  items,
  Bottom = NavBottom,
  Label = NavLabel,
  varient = 'line',
  url,
  match,
  style,
  ...props
}: NavProps) => {
  const { palette } = useTheme()

  return (
    <Tabs
      style={{
        border: `solid 1px ${varient === 'line' ? palette.cNeutral2 : palette.cNeutral8}`,
        display: 'flex',
        ...style,
      }}
      varient={varient}
      Bottom={Bottom}
      Label={Label}
      {...props}>
      {items.map(({ to, ...props }, i) => (
        <Tabs.Item key={i} value={to} to={to} {...props} />
      ))}
    </Tabs>
  )
}

export default Nav
