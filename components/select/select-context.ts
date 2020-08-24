import React, { MutableRefObject } from 'react'
import { NormalSizes, SelectVariants } from '../utils/prop-types'

export interface SelectConfig {
  value?: string | string[]
  variant?: SelectVariants
  updateValue?: Function
  visible?: boolean
  size?: NormalSizes
  disableAll?: boolean
  ref?: MutableRefObject<HTMLElement | null>
}
export interface SelectHandles {
  setValue: (visible?: string | string[]) => void
  getValue: () => string | string[] | undefined
}

const defaultContext = {
  visible: false,
  variant: 'line' as SelectVariants,
  size: 'medium' as NormalSizes,
  disableAll: false,
}

export const SelectContext = React.createContext<SelectConfig>(defaultContext)

export const useSelectContext = (): SelectConfig => React.useContext<SelectConfig>(SelectContext)
