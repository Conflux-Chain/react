import React, {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  RefObject,
} from 'react'
import { TabsItemConfig, TabsConfig, TabsContext, Handles } from './tabs-context'
import TabsItem from './tabs-item'
import DefaultLabel from './tabs-label'
import DefaultBottom from './tabs-bottom'
import useTheme from '../styles/use-theme'

import { TabVarient } from '../utils/prop-types'
import { nav } from './tabs-nav'
import useImperative from './useImperative'

interface Props {
  initialValue?: string
  value?: string
  onChange?: (val: string) => void
  className?: string
  Label?: React.FC
  Bottom?: React.FC
  before?: React.ReactNode
  after?: React.ReactNode
  varient?: TabVarient
  showDivider?: boolean
}

const Tabs: React.ForwardRefRenderFunction<Handles, React.PropsWithChildren<Props>> = (
  {
    initialValue: userCustomInitialValue,
    value,
    children,
    varient = 'line',
    Label = DefaultLabel,
    Bottom = DefaultBottom,
    before = null,
    after = null,
    onChange,
    className = '',
    showDivider,
    ...props
  }: React.PropsWithChildren<Props>,
  ref: RefObject<Handles>,
) => {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState<string | undefined>(userCustomInitialValue)
  const [tabs, setTabs] = useState<TabsItemConfig[]>([])

  const Nav = useMemo(() => nav({ Bottom, Label }), [Label, Bottom])

  useImperativeHandle(
    ref,
    () => ({
      currentTab: (v?: string) => (v ? setCurrentTab(v) : currentTab),
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
          {before}
          {tabs.map(item => {
            return (
              <div
                className={`tab ${currentTab === item.value ? 'active' : ''}`}
                role="button"
                key={item.value}
                onClick={() => clickHandler(item)}>
                <Nav
                  varient={varient}
                  status={{
                    disabled: item.disabled,
                    active: currentTab === item.value,
                    default: true,
                  }}
                  label={item.label}></Nav>
              </div>
            )
          })}
          {after}
        </header>
        <div className="content">{children}</div>
        <style jsx>{`
          header {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            align-items: center;
          }
          ::-webkit-scrollbar {
            display: none;
          }
          .content {
            padding-top: 0.625rem;
          }

          .tab {
            cursor: pointer;
            outline: 0;
            text-transform: capitalize;
            font-size: 1rem;
            margin: 0 3px;
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

export default ForwardTab as typeof ForwardTab & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
  useImperative: typeof useImperative
}
