import React, { useEffect, useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import { useTabsContext, TabsConfig } from './tabs-context'

interface Props {
  label: string | React.ReactNode
  value: string
  disabled?: boolean
}

const defaultProps = {
  disabled: false,
  children: null,
}

export type TabsItemProps = Props & typeof defaultProps

const TabsItem: React.FC<React.PropsWithChildren<TabsItemProps>> = ({
  children,
  value,
  label,
  disabled,
}) => {
  const { register, currentValue } = useTabsContext() as TabsConfig
  const isActive = useMemo(() => currentValue === value, [currentValue, value])

  useEffect(() => {
    register && register({ value, label, disabled })
  }, [value, label, disabled])

  //remove corresponding data model when unmount
  useEffect(() => {
    return () => {
      register && register({ remove: value })
    }
  }, [])

  /* eslint-disable react/jsx-no-useless-fragment */
  return isActive ? children : null
}

export default withDefaults(TabsItem, defaultProps)
/* eslint-enable */
