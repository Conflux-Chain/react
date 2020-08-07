import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react'
import TabsItem from './tabs-item'
import useTheme from '../styles/use-theme'
import { TabsItemConfig, TabsConfig, TabsContext } from './tabs-context'
import { TabVarient } from '../utils/prop-types'
import DefaultLabelComponent, { LabelCptProps, nav } from './tabs-nav'

interface Props {
  initialValue?: string
  value?: string
  Label: React.FC<LabelCptProps>
  onChange?: (val: string) => void
  className?: string
  Bottom?: React.FC
  varient?: TabVarient
  showDivider?: boolean
}

export interface Handles {
  currentTab(v: string | undefined): void
}

const Tabs: React.ForwardRefRenderFunction<Handles, React.PropsWithChildren<Props>> = (
  {
    initialValue: userCustomInitialValue,
    value,
    children,
    varient = 'line',

    Label = DefaultLabelComponent,
    onChange,
    className,
    showDivider,
    ...props
  }: React.PropsWithChildren<Props>,
  ref,
) => {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState<string | undefined>(userCustomInitialValue)
  const [tabs, setTabs] = useState<TabsItemConfig[]>([])

  useImperativeHandle(
    ref,
    () => ({
      currentTab: (v: string | undefined) => (v ? setCurrentTab(v) : currentTab),
    }),
    [currentTab],
  )

  const register = useCallback((next: TabsItemConfig | { remove: string }) => {
    setTabs(last => {
      if ('remove' in next) {
        return last.filter(({ value }) => value !== next.remove)
      } else {
        const hasItem = last.find(item => item.value === next.value)
        if (!hasItem) return [...last, next]
        return last.map(item => {
          if (item.value !== next.value) return item
          return {
            ...item,
            label: next.label,
            disabled: next.disabled,
          }
        })
      }
    })
  }, [])

  const ctx = useMemo<TabsConfig>(
    () => ({
      register,
      currentValue: currentTab,
    }),
    [currentTab],
  )

  const clickHandler = (item: TabsItemConfig) => {
    if (item.disabled) return
    if (!value) {
      //uncontrolled
      setCurrentTab(item.value)
    }

    onChange && onChange(item.value)
  }

  useEffect(() => {
    //controlled component
    if (value) {
      setCurrentTab(value)
    }
  }, [value])

  return (
    <TabsContext.Provider value={ctx}>
      <div className={`${className}`} {...props}>
        <header style={{ borderBottom: showDivider ? `1px solid ${theme.palette.border}` : '' }}>
          {tabs.map(item => {
            return (
              <div
                className={`tab ${currentTab === item.value ? 'active' : ''}`}
                role="button"
                key={item.value}
                onClick={() => clickHandler(item)}>
                <Label
                  varient={varient}
                  status={{
                    disabled: item.disabled,
                    active: currentTab === item.value,
                    default: true,
                  }}
                  label={item.label}></Label>
              </div>
            )
          })}
        </header>
        <div className="content">{children}</div>
        <style jsx>{`
          header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
          }
          .content {
            padding-top: 0.625rem;
          }

          .tab {
            cursor: pointer;
            outline: 0;
            text-transform: capitalize;
            font-size: 1rem;
            margin: 0 18px;
            user-select: none;
            display: flex;
            align-items: center;
            line-height: 1.25rem;
            position: relative;
            font-variant-numeric: tabular-nums;
          }

          .tab :global(.bottom) {
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
          }

          .tab:first-of-type {
            margin-left: 0;
          }
        `}</style>
      </div>
    </TabsContext.Provider>
  )
}

const ForwardTab = forwardRef<Handles, React.PropsWithChildren<Props>>(Tabs)

//may be a more reliabe way add property rather than declare from scratch
export default ForwardTab as typeof ForwardTab & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
  nav: typeof nav
}
