import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  line?: boolean
  title?: boolean
}

const defaultProps = {
  line: false,
  title: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PopoverItemProps = Props & typeof defaultProps & NativeAttrs

const PopoverItem: React.FC<React.PropsWithChildren<PopoverItemProps>> = ({
  children,
  line,
  title,
  className,
  ...props
}) => {
  const theme = useTheme()
  return (
    <>
      <div
        className={`item ${line && !title ? 'line' : ''} ${title ? 'title' : ''} ${className}`}
        {...props}>
        {children}
        <style jsx>{`
          .item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: ${theme.palette.cNeutral5};
            font-size: 1rem;
            line-height: 1.4286rem;
            text-align: left;
            transition: color 0.1s ease 0s, background-color 0.1s ease 0s;
            width: 100%;
            padding: ${theme.layout.gap};
            box-sizing: border-box;
          }

          .item:hover {
            color: ${theme.palette.cNeutral7};
          }

          .item > :global(*) {
            margin: 0;
          }

          .item.title {
            line-height: 1.1429rem;
            font-weight: 500;
            font-size: 1rem;
            color: ${theme.palette.cNeutral7};
          }

          .item.line {
            line-height: 0;
            height: 0;
            padding: 0;
            border-top: 1px solid ${theme.palette.cNeutral1};
            width: 100%;
          }
        `}</style>
      </div>
      {title && line && <PopoverItem line title={false} className="" />}
    </>
  )
}

const MemoPopoverItem = React.memo(PopoverItem)

export default withDefaults(MemoPopoverItem, defaultProps)
