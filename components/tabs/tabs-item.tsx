import React, { useEffect, useMemo } from 'react'
import { useTabsContext, TabsConfig } from './tabs-context'

interface Props {
  label: string
  value: string
  children?: string | React.ReactNode
  disabled?: boolean
  [extra: string]: any
}

const defaultProps = {
  disabled: false,
}

const TabsItem: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  value,
  label,
  disabled,
  ...extra
}: React.PropsWithChildren<Props & typeof defaultProps>) => {
  const { register, currentValue } = useTabsContext() as TabsConfig
  const isActive = useMemo(() => currentValue === value, [currentValue, value])

  useEffect(() => {
    register && register({ value, label, disabled, ...extra })
  }, [value, label, disabled, extra])

  //remove corresponding data model when unmount
  useEffect(() => {
    return () => {
      register && register({ remove: value })
    }
  }, [])

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? <>{children}</> : null
}

TabsItem.defaultProps = defaultProps

export default TabsItem
