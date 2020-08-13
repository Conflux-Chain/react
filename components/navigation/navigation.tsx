import Tabs, { TabProps } from '../tabs/tabs'
import { TabsItemProps } from '../tabs/tabs-item'

type ItemType = Omit<TabsItemProps, 'children'>
type NavProps = Omit<TabProps, 'onChange'> & { items: ItemType[] }

// interface NavProps {
//     items: ItemType[],
//     initialValue?: string
//     value?: string
//     onChange?: (val: string) => void
//     className?: string
//     Label?: React.FC
//     Bottom?: React.FC
//     before?: React.ReactNode
//     after?: React.ReactNode
//     varient?: TabVarient
//     showDivider?: boolean
// }
const Nav = ({ items, ...props }: NavProps) => {
    return <Tabs {...props}>
        {items.map((props, i) => (
            <Tabs.Item key={i} {...props} />
        ))}
    </Tabs>
}

export default Nav

