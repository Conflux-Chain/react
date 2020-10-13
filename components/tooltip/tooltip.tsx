import React, { useMemo, useEffect, useRef, useState, MouseEvent } from 'react'
import withDefaults from '../utils/with-defaults'
import { usePopper } from 'react-popper'
import useTheme from '../styles/use-theme'
import { getColors } from './styles'
import { TriggerTypes, Placement, SnippetColors } from '../utils/prop-types'
// import CSSTransition from '../shared/css-transition'
import useClickAway from '../utils/use-click-away'
import type { Options } from '@popperjs/core/lib/modifiers/offset'

export type TooltipOnVisibleChange = (visible: boolean) => void

type EventHandlerWithChangeVisible = (
  event: React.MouseEvent<any, globalThis.MouseEvent>,
  setVisible: (nextState: boolean) => void,
) => void | undefined

export const defaultProps = {
  defaultVisible: false,
  hideArrow: false,
  color: 'default' as SnippetColors,
  trigger: 'hover' as TriggerTypes,
  placement: 'auto' as Placement,
  // enterDelay: 100,
  // leaveDelay: 200,
  offset: [0, 10] as Options['offset'],
  className: '',
  contentClassName: '',
}

export interface Props extends Omit<React.HTMLAttributes<any>, 'onMouseEnter' | 'onMouseLeave'> {
  text: string | React.ReactNode
  color?: SnippetColors
  placement?: Placement
  visible?: boolean
  defaultVisible?: boolean
  hideArrow?: boolean
  trigger?: TriggerTypes
  // enterDelay?: number
  // leaveDelay?: number
  offset?: Options['offset']
  contentClassName?: string
  onVisibleChange?: TooltipOnVisibleChange
  onMouseEnter?: EventHandlerWithChangeVisible
  onMouseLeave?: EventHandlerWithChangeVisible
  // onClick?: EventHandlerWithChangeVisible
  onClickAway?: (event: Event, setVisible: (nextState: boolean) => void) => void
}

export type TooltipProps = React.PropsWithChildren<Props>

const Tooltip: React.FC<TooltipProps> = ({
  children,
  defaultVisible,
  text,
  offset,
  placement,
  contentClassName,
  // enterDelay,
  // leaveDelay,
  trigger,
  color,
  className,
  onVisibleChange,
  hideArrow,
  visible: customVisible,
  onMouseEnter,
  onMouseLeave,
  // onClick,
  onClickAway,
  ...props
}: TooltipProps & typeof defaultProps) => {
  // const timer = useRef<number>()
  const theme = useTheme()
  const parentRef = useRef(null)
  const contentRef = useRef(null)
  const [arrowRef, setArrowRef] = useState(null)
  const [visible, setVisible] = useState<boolean>(
    customVisible === undefined ? defaultVisible : customVisible,
  )
  const { styles, attributes } = usePopper(parentRef?.current, contentRef?.current, {
    modifiers: [
      {
        name: 'arrow',
        options: { element: arrowRef, padding: 10 },
      },
      {
        name: 'offset',
        options: {
          offset,
        },
      },
    ],
    placement,
  })

  const colors = useMemo(() => getColors(color, theme.palette), [color, theme.palette])

  const changeVisible = (visible: boolean) => {
    if (typeof onVisibleChange === 'function') onVisibleChange(visible)
    setVisible(visible)
  }
  // const changeVisible = (nextState: boolean) => {
  //   const clear = () => {
  //     clearTimeout(timer.current)
  //     timer.current = undefined
  //   }
  //   const handler = (nextState: boolean) => {
  //     setVisible(nextState)
  //     onVisibleChange(nextState)
  //     clear()
  //   }
  //   clear()
  //   if (nextState) {
  //     timer.current = window.setTimeout(() => handler(true), enterDelay)
  //     return
  //   }
  //   timer.current = window.setTimeout(() => handler(false), leaveDelay)
  // }

  const mouseEventHandler = (e: MouseEvent, next: boolean) => {
    if (customVisible === undefined) trigger === 'hover' && changeVisible(next)
    if (next) onMouseEnter && onMouseEnter(e, changeVisible)
    else onMouseLeave && onMouseLeave(e, changeVisible)
  }
  const clickEventHandler = () => trigger === 'click' && changeVisible(!visible)

  const clickAwayHandler: (e: Event) => void = e => {
    if (customVisible === undefined) trigger === 'click' && changeVisible(false)
    onClickAway && onClickAway(e, changeVisible)
  }

  useClickAway(parentRef, clickAwayHandler)

  useEffect(() => {
    if (customVisible === undefined) return
    changeVisible(customVisible)
  }, [customVisible])

  return (
    <div>
      <div
        className={`tooltip ${className}`}
        ref={parentRef}
        onClick={clickEventHandler}
        onMouseEnter={e => mouseEventHandler(e, true)}
        onMouseLeave={e => mouseEventHandler(e, false)}
        {...props}>
        {children}
      </div>
      {visible && (
        <div
          className={`tooltip-content ${contentClassName}`}
          ref={contentRef}
          style={styles.popper}
          {...attributes.popper}>
          {/* @ts-ignore*/}
          {!hideArrow && <div className="tooltip-arrow" ref={setArrowRef} style={styles.arrow} />}
          {text}
        </div>
      )}
      <style jsx>{`
        .tooltip {
          display: inline-block;
        }

        .tooltip-content {
          box-shadow: ${theme.expressiveness.D2};
          border-radius: ${theme.expressiveness.R2};
          z-index: 1000;
          color: ${colors.color};
          background-color: ${colors.bgColor};
          padding: calc(${theme.layout.gapHalf} * 1.5);
          border-radius: ${theme.expressiveness.R2};
        }

        .tooltip-arrow,
        .tooltip-arrow::before {
          position: absolute;
          width: 10px;
          height: 10px;
          z-index: -1;
        }

        .tooltip-arrow::before {
          content: '';
          transform: rotate(45deg);
          background-color: red;
          background-color: ${colors.bgColor};
        }
        .tooltip-content[data-popper-placement^='top'] > .tooltip-arrow {
          bottom: -5px;
        }

        .tooltip-content[data-popper-placement^='bottom'] > .tooltip-arrow {
          top: -5px;
        }

        .tooltip-content[data-popper-placement^='left'] > .tooltip-arrow {
          right: -5px;
        }

        .tooltip-content[data-popper-placement^='right'] > .tooltip-arrow {
          left: -5px;
        }
      `}</style>
    </div>
  )
}

export default withDefaults(Tooltip, defaultProps)
