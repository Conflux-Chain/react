import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import { Message } from './use-message'
import X from '@zeit-ui/react-icons/x'
import { getStyles } from './styles'

export type MessageItemProps = Message & {
  id?: string
  destroy?: Function
}
const transitionDuration = 150

const MessageItem: React.FC<MessageItemProps> = React.memo(
  ({ className, id, text, delay, destroy, onClose, closeable, ...rest }) => {
    const theme = useTheme()
    const { color, bgColor, icon } = useMemo(() => getStyles(theme.palette, rest.color), [
      theme.palette,
      rest.color,
    ])
    let boxShadow = theme.expressiveness.D2
    if (rest.color !== 'default' && !rest.shadow) {
      boxShadow = 'none'
    }
    const [visible, setVisible] = useState<boolean>(false)
    const [hide, setHide] = useState<boolean>(false)
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true)
        clearTimeout(timer)
      }, 10)
      return () => clearTimeout(timer)
    }, [])
    useEffect(() => {
      let timer: any = null
      if (delay) {
        timer = setTimeout(() => {
          setHide(true)
          clearTimeout(timer)
        }, delay)
      }
      return () => {
        delay && clearTimeout(timer)
      }
    }, [delay])
    useEffect(() => {
      let timer: any = null
      if (hide) {
        timer = setTimeout(() => {
          destroy && destroy(id)
          onClose && onClose(id)
          clearTimeout(timer)
        }, transitionDuration)
      }
      return () => clearTimeout(timer)
    }, [hide])
    const handleClose = () => {
      setHide(true)
    }
    return (
      <div
        key={id}
        className={`message ${className} ${visible ? 'visible' : ''} ${hide ? 'hide' : ''}`}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}>
        <div className="icon">{rest.icon || icon}</div>
        <div className="text">{text}</div>
        {closeable && (
          <div className="close" onClick={handleClose}>
            <X />
          </div>
        )}
        <style jsx>{`
          .message {
            max-width: 71.4286rem;
            background-color: ${bgColor};
            color: ${color};
            border: 0;
            border-radius: ${theme.expressiveness.R2};
            padding: ${theme.layout.gap};
            box-shadow: ${boxShadow};
            margin-top: calc(${theme.layout.gap} * 1.5);
            transform: translate(0, -100%);
            opacity: 0;
            transition: transform ${transitionDuration}ms, opacity ${transitionDuration}ms,
              margin-top ${transitionDuration}ms;
            display: flex;
            align-items: center;
          }
          .message:first-child {
            margin-top: 0;
          }
          .message.visible {
            transform: translate(0, 0);
            opacity: 1;
          }
          .message.hide {
            margin-top: -3.5714rem;
            opacity: 0;
          }
          .icon {
            height: 1.1429rem;
            width: 1.1429rem;
            margin-right: calc(${theme.layout.gap} * 0.5);
            flex-grow: 1;
            flex-shrink: 0;
          }
          .icon > :global(svg) {
            width: 100%;
            height: 100%;
          }
          .text {
            font-style: normal;
            font-weight: 600;
            font-size: 1rem;
            line-height: 1.2857rem;
          }
          .close {
            height: 1.1429rem;
            width: 1.1429rem;
            cursor: pointer;
            margin-left: ${theme.layout.gap};
            color: ${theme.palette.cNeutral3};
            flex-grow: 1;
            flex-shrink: 0;
          }
          .close > :global(svg) {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  },
)

export default MessageItem
