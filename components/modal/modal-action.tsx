import React, { MouseEvent, useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import Button from '../button'
import { ButtonTypes, ButtonVariants, NormalSizes } from '../utils/prop-types'
import { useModalContext } from './modal-context'

type ModalActionEvent = MouseEvent<HTMLButtonElement> & {
  close: () => void
}

interface Props {
  variant?: ButtonVariants
  color?: ButtonTypes
  size?: NormalSizes
  ghost?: boolean
  loading?: boolean
  shadow?: boolean
  auto?: boolean
  effect?: boolean
  disabled?: boolean
  htmlType?: React.ButtonHTMLAttributes<any>['type']
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: (event: ModalActionEvent) => void
  className?: string
}

const defaultProps = {
  variant: 'line' as ButtonVariants,
  color: 'primary' as ButtonTypes,
  size: 'medium' as NormalSizes,
  htmlType: 'button' as React.ButtonHTMLAttributes<any>['type'],
  ghost: false,
  loading: false,
  shadow: false,
  auto: false,
  effect: true,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type ModalActionProps = Props & typeof defaultProps & NativeAttrs

const ModalAction: React.FC<ModalActionProps> = ({ children, onClick, disabled, ...props }) => {
  const { close } = useModalContext()
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    const actionEvent = Object.assign({}, event, {
      close: () => close && close(),
    })
    onClick && onClick(actionEvent)
  }

  return (
    <>
      <Button onClick={clickHandler} {...props}>
        {children}
      </Button>
      <style jsx></style>
    </>
  )
}

export default withDefaults(ModalAction, defaultProps)
