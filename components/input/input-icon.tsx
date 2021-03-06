import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'

export interface InputIconProps {
  icon: React.ReactNode
  ratio: string
  clickable: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  paddingLeft?: string
  paddingRight?: string
}

const InputIcon: React.FC<InputIconProps> = ({
  icon,
  ratio,
  clickable,
  onClick,
  paddingLeft,
  paddingRight,
}) => {
  const theme = useTheme()
  const width = useMemo(() => {
    return `calc(${ratio} * ${theme.layout.gap} * .35)`
  }, [theme.layout.gap, ratio])
  const padding = useMemo(() => {
    return `calc(${ratio} * ${theme.layout.gap} * .3)`
  }, [theme.layout.gap, ratio])

  return (
    <span className="input-icon" onClick={onClick}>
      {icon}
      <style jsx>{`
        .input-icon {
          box-sizing: content-box;
          display: flex;
          width: ${width};
          height: 100%;
          align-items: center;
          vertical-align: middle;
          margin: 0;
          padding: 0 ${paddingRight || padding} 0 ${paddingLeft || padding};
          line-height: 1;
          position: relative;
          cursor: ${clickable ? 'pointer' : 'default'};
          pointer-events: ${clickable ? 'auto' : 'none'};
        }
      `}</style>
    </span>
  )
}

const MemoInputIcon = React.memo(InputIcon)

export default MemoInputIcon
