import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import Check from '@zeit-ui/react-icons/check'
import useTheme from '../styles/use-theme'
import useRgb from '../styles/use-rgb'
import { useSelectContext } from './select-context'
import useWarning from '../utils/use-warning'
import Ellipsis from '../shared/ellipsis'

interface Props {
  value?: string
  disabled?: boolean
  className?: string
  divider?: boolean
  label?: boolean
  preventAllEvents?: boolean
}

const defaultProps = {
  disabled: false,
  divider: false,
  label: false,
  className: '',
  preventAllEvents: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectOptionProps = Props & typeof defaultProps & NativeAttrs

const SelectOption: React.FC<React.PropsWithChildren<SelectOptionProps>> = ({
  value: identValue,
  className,
  children,
  disabled,
  divider,
  label,
  preventAllEvents,
  ...props
}) => {
  const theme = useTheme()
  const { updateValue, value, disableAll, variant } = useSelectContext()
  const isDisabled = useMemo(() => disabled || disableAll, [disabled, disableAll])
  const isLabel = useMemo(() => label || divider, [label, divider])
  if (!isLabel && identValue === undefined) {
    useWarning('The props "value" is required.', 'Select Option')
  }

  const selected = useMemo(() => {
    if (!value) return false
    if (typeof value === 'string') {
      return identValue === value
    }
    return value.includes(`${identValue}`)
  }, [identValue, value])

  const bgColor = useMemo(() => {
    if (isDisabled) return theme.palette.cNeutral3
    return selected && variant !== 'text' ? theme.palette.cTheme5 : theme.palette.cNeutral8
  }, [selected, isDisabled, theme.palette])

  const rgb = useRgb(theme.palette.cTheme5)
  const hoverBgColor = useMemo(() => {
    if (isDisabled || isLabel || selected) return bgColor
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.04)`
  }, [selected, isDisabled, theme.palette, isLabel, bgColor])

  const color = useMemo(() => {
    if (isDisabled) return theme.palette.cNeutral4
    return selected
      ? variant === 'text'
        ? theme.palette.cTheme5
        : theme.palette.cNeutral8
      : theme.palette.cNeutral6
  }, [selected, isDisabled, theme.palette])

  const hoverColor = useMemo(() => {
    if (isDisabled || isLabel || selected) return color
    return theme.palette.cTheme5
  }, [selected, isDisabled, theme.palette, isLabel, color])

  const border = useMemo(() => {
    if (isDisabled || variant !== 'text') return '0'
    return selected ? `1px solid ${theme.palette.cTheme5}` : `1px solid ${theme.palette.cNeutral8}`
  }, [selected, isDisabled, theme.palette])

  const hoverBorder = useMemo(() => {
    if (isDisabled || isLabel || selected || variant !== 'text') return border
    return `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`
  }, [selected, isDisabled, theme.palette, isLabel, color])

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (preventAllEvents) return
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
    if (isDisabled || isLabel) return
    updateValue && updateValue(identValue)
  }

  return (
    <>
      <div
        className={`option ${divider ? 'divider' : ''} ${label ? 'label' : ''} ${className}`}
        onClick={clickHandler}
        {...props}>
        <Ellipsis height={`calc(1.688 * ${theme.layout.gap})`}>{children}</Ellipsis>
        {selected && <Check size={18} />}
      </div>

      <style jsx>{`
        .option {
          display: flex;
          max-width: 100%;
          justify-content: space-between;
          align-items: center;
          font-weight: normal;
          font-size: 0.75rem;
          height: calc(1.875 * ${theme.layout.gap});
          padding: 0 calc(1.5 * ${theme.layout.gapHalf});
          background-color: ${bgColor};
          color: ${color};
          user-select: none;
          border: ${border};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
        }

        .option:hover {
          background-color: ${variant === 'text' ? theme.palette.cNeutral8 : hoverBgColor};
          color: ${hoverColor};
          border: ${hoverBorder};
        }

        .divider {
          line-height: 0;
          height: 0;
          padding: 0;
          overflow: hidden;
          border-top: 1px solid ${theme.palette.border};
          margin: 0.5rem 0;
          width: 100%;
        }

        .label {
          font-size: 0.875rem;
          color: ${theme.palette.accents_7};
          border-bottom: 1px solid ${theme.palette.border};
          text-transform: capitalize;
          cursor: default;
        }
      `}</style>
    </>
  )
}

export default withDefaults(SelectOption, defaultProps)
