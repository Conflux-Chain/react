import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import Tooltip, { TooltipProps, defaultProps as tooltipDefaultProps } from '../tooltip/tooltip'
import { Placement, TriggerTypes, SnippetColors } from '../utils/prop-types'
import PopoverItem from '../popover/popover-item'
import { getReactNode } from '../utils/collections'

export interface Props extends Omit<TooltipProps, 'title' | 'content' | 'text'> {
  title?: React.ReactNode | (() => React.ReactNode)
  notSeperateTitle?: boolean
  content?: React.ReactNode | (() => React.ReactNode)
}

export const defaultProps = Object.assign({}, tooltipDefaultProps, {
  notSeperateTitle: false,
  trigger: 'click' as TriggerTypes,
  placement: 'bottom' as Placement,
  color: 'lite' as SnippetColors,
})

export interface TextProps {
  title?: React.ReactNode | (() => React.ReactNode)
  titleNode: React.ReactNode | (() => React.ReactNode)
  line: boolean
  text: React.ReactNode
}

const PopoverText: React.FC<TextProps> = ({ title, titleNode, line, text }) => {
  const theme = useTheme()

  return (
    <div className="inner">
      {title && (
        <div className="title">
          <PopoverItem title line={line}>
            {titleNode}
          </PopoverItem>
        </div>
      )}
      <div className="items">{text}</div>
      <style jsx>{`
        .inner {
          padding: 0;
          text-align: left;
          min-width: 17.1429rem;
          max-width: 34.2857rem;
        }
        .inner .items {
          max-height: 17.1429rem;
          overflow: auto;
        }
        .inner .title .item.title {
          line-height: 1.1429rem;
          font-weight: 500;
          font-size: 1rem;
          color: ${theme.palette.cNeutral7};
        }
      `}</style>
    </div>
  )
}

export type PopoverProps = React.PropsWithChildren<Props>
const Popover: React.FC<PopoverProps> = ({
  title,
  notSeperateTitle,
  content,
  children,
  className,
  ...props
}: PopoverProps & typeof defaultProps) => {
  const theme = useTheme()
  const titleNode = title && useMemo(() => getReactNode(title), [title])
  const textNode = useMemo(() => getReactNode(content), [content])

  return (
    <Tooltip
      className={`popover ${className}`}
      {...{
        ...props,
        text: (
          <PopoverText
            title={title}
            titleNode={titleNode}
            line={!notSeperateTitle}
            text={textNode}
          />
        ),
      }}>
      {children}
      <style jsx>{`
        .tooltip-content.popover {
          filter: drop-shadow(${theme.expressiveness.D2});
        }
      `}</style>
    </Tooltip>
  )
}

Popover.defaultProps = defaultProps
const PopoverComponent = Popover as typeof Popover & {
  Item: typeof PopoverItem
  Option: typeof PopoverItem
}
PopoverComponent.Item = PopoverItem
PopoverComponent.Option = PopoverItem

export default PopoverComponent
