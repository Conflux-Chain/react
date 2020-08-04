import React, { useMemo, useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import TabsItem from './tabs-item'
import useTheme from '../styles/use-theme'
import { TabsItemConfig, TabsConfig, TabsContext } from './tabs-context'
import Bottom from './tabs-bottom'

interface Props {
  initialValue?: string
  hideDivider?: boolean
  onChange?: (val: string) => void
  className?: string
  Bottom?: React.FC
}

const defaultProps = {
  className: '',
  hideDivider: false,
  Bottom,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TabsProps = Props & typeof defaultProps & NativeAttrs

const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = forwardRef(
  (
    {
      initialValue: userCustomInitialValue,
      Bottom,
      hideDivider,
      children,
      onChange,
      className,
      ...props
    },
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

    const register = (next: TabsItemConfig | { remove: string }) => {
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
    }

    const initialValue = useMemo<TabsConfig>(
      () => ({
        register,
        currentValue: currentTab,
        inGroup: true,
      }),
      [currentTab],
    )

    const clickHandler = (item: TabsItemConfig) => {
      if (item.disabled) return
      setCurrentTab(item.value)
      onChange && onChange(item.value)
    }

    return (
      <TabsContext.Provider value={initialValue}>
        <div className={`tabs ${className}`} {...props}>
          <header className={hideDivider ? 'hide-divider' : ''}>
            {tabs.map(item => {
              const isActive = currentTab === item.value

              return (
                <div
                  className={`tab ${currentTab === item.value ? 'active' : ''} ${
                    item.disabled ? 'disabled' : ''
                  }`}
                  role="button"
                  key={item.value}
                  onClick={() => clickHandler(item)}>
                  {item.label}

                  <Bottom
                    className="bottom"
                    color={isActive ? theme.palette.foreground : 'transparent'}></Bottom>
                </div>
              )
            })}
          </header>
          <div className="content">{children}</div>
          <style jsx>{`
            .tabs {
              width: initial;
            }

            header {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              border-bottom: 1px solid ${theme.palette.border};
            }

            .hide-divider {
              border-bottom: none;
            }

            .content {
              padding-top: 0.625rem;
            }

            .tab {
              padding: 10px calc(0.65 * ${theme.layout.gapQuarter});
              cursor: pointer;
              outline: 0;
              transition: all 200ms ease;
              text-transform: capitalize;
              font-size: 1rem;
              margin: 0 calc(0.8 * ${theme.layout.gapHalf});
              color: ${theme.palette.accents_6};
              user-select: none;
              display: flex;
              align-items: center;
              line-height: 1.25rem;
              position: relative;
            }

            .tab :global(.bottom) {
              position: absolute;
              content: '';
              bottom: -1px;
              left: 0;
              right: 0;
              width: 100%;

              transform: scaleX(0.75);
              transition: all 200ms ease;
            }

            .tab.active :global(.bottom) {
              transform: scaleX(1);
            }

            .tab :global(svg) {
              max-height: 1em;
              margin-right: 5px;
            }

            .tab:first-of-type {
              margin-left: 0;
            }

            .tab.active {
              color: ${theme.palette.foreground};
            }

            .tab.disabled {
              color: ${theme.palette.accents_3};
              cursor: not-allowed;
            }
          `}</style>
        </div>
      </TabsContext.Provider>
    )
  },
)
type TabsComponent<P = {}> = React.FC<P> & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Tabs.defaultProps = defaultProps

export default Tabs as TabsComponent<ComponentProps>
