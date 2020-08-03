import React from 'react'
import { NormalSizes, InputTypes } from 'components/utils/prop-types'

export interface Props {
  solid?: boolean
  value?: string
  initialValue?: string
  placeholder?: string
  size?: NormalSizes
  status?: InputTypes
  readOnly?: boolean
  disabled?: boolean
  label?: string
  labelRight?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  iconClickable?: boolean
  width?: string
  className?: string
  clearable?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  autoComplete: string
}

export const defaultProps = {
  solid: false,
  disabled: false,
  readOnly: false,
  clearable: false,
  iconClickable: false,
  width: 'initial',
  size: 'medium' as NormalSizes,
  status: 'default' as InputTypes,
  autoComplete: 'off',
  className: '',
  placeholder: '',
  initialValue: '',
}
