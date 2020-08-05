import React, { useMemo, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import TabsItem from './tabs-item'
import useTheme from '../styles/use-theme'
import { TabsItemConfig, TabsConfig, TabsContext } from './tabs-context'
import Bottom from './tabs-bottom'
import { TabVarient, TabStatus } from '../utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'

interface Props {
  initialValue?: string
  value?: string
  onChange?: (val: string) => void
  className?: string
  Bottom?: React.FC
  varient?: TabVarient
  showDivider?: boolean
}

const defaultProps = {
  className: '',
  Bottom,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TabsProps = Props & typeof defaultProps & NativeAttrs

const getColor: any = (palette: ZeitUIThemesPalette, varient: TabVarient, status: TabStatus) => {
  if (status === 'active' || status === 'hover') {
    return {
      color: palette.cTheme5,
      textShadow: `0 0 0.8px ${palette.cTheme5}`,
      background:
        varient === 'line' ? '' : status === 'active' ? palette.cTheme0 : palette.cNeutral1,
    }
  } else if (status === 'default') {
    return {
      color: palette.cNeutral6,
      background: varient === 'solid' ? palette.cNeutral1 : '',
    }
  } else if (status === 'disabled') {
    return {
      color: palette.cNeutral5,
      background: varient === 'solid' ? palette.cNeutral0 : '',
      cursor: 'not-allowed',
    }
  }
}
const stack: TabStatus[] = ['disabled', 'active', 'hover', 'default']

type StatusMap = {
  [key in TabStatus]?: boolean
} & { default: true }

function getStatus(props: StatusMap): TabStatus | undefined {
  for (let i = 0; i <= stack.length; i++) {
    const s = stack[i]
    if (props[s]) {
      return s
    }
  }
}

interface LabelProps {
  varient: TabVarient
  status: StatusMap
  children?: string | React.ReactNode
  palette: ZeitUIThemesPalette
}

const TabLabel: React.FC<React.PropsWithChildren<LabelProps>> = ({
  palette,
  varient,
  status,
  children,
}) => {
  const [hover, setHover] = useState(false)
  const computeStatus = useMemo(() => getStatus({ ...status, hover }), [status, hover])

  const styles = useMemo(() => getColor(palette, varient, computeStatus), [
    palette,
    varient,
    computeStatus,
  ])

  return (
    <div
      className="label"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles }}>
      {children}
      <style jsx>{`
      .label{
        padding: 9px 16px;
        border-radius: 4px 4px 0px 0px;
      }
    }
    `}</style>
    </div>
  )
}
export interface TabHandles {
  currentTab(v: string | undefined): void
}

const Tabs: React.ForwardRefRenderFunction<TabHandles, React.PropsWithChildren<TabsProps>> = (
  {
    initialValue: userCustomInitialValue,
    value,
    Bottom,
    children,
    varient = 'line',
    onChange,
    className,
    showDivider,
    ...props
  }: React.PropsWithChildren<TabsProps>,
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
    <TabsContext.Provider value={initialValue}>
      <div className={`tabs ${className}`} {...props}>
        <header style={{ borderBottom: showDivider ? `1px solid ${theme.palette.border}` : '' }}>
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
                <TabLabel
                  palette={theme.palette}
                  varient={varient}
                  status={{ disabled: item.disabled, active: isActive, default: true }}>
                  <>
                    {item.label}
                    {varient === 'line' && (
                      <Bottom
                        className="bottom"
                        color={isActive ? theme.palette.cTheme0 : 'transparent'}
                      />
                    )}
                  </>
                </TabLabel>
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
            content: '';
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
            transform: scaleX(0.75);
            transition: transform 200ms ease;
          }

          .tab.active :global(.bottom) {
            transform: scaleX(1);
          }
          .tab:first-of-type {
            margin-left: 0;
          }
        `}</style>
      </div>
    </TabsContext.Provider>
  )
}

const ForwardTab = forwardRef<TabHandles, React.PropsWithChildren<Props>>(Tabs)
ForwardTab.defaultProps = defaultProps

//may be a more reliabe way add property rather than declare from scratch
export default ForwardTab as typeof ForwardTab & {
  Item: typeof TabsItem
  Tab: typeof TabsItem
}
