import React, { useMemo } from 'react'
import { TabVariant } from 'components/utils/prop-types'
import { defaultGetColor } from './style'
import useTheme from '../styles/use-theme'

export interface NavCptProps {
  variant: TabVariant
  disabled: boolean
  active: boolean
  label: string | React.ReactNode
}

const Nav: React.FC<NavCptProps> = ({ label, variant, disabled, active }) => {
  const { palette, layout, expressiveness } = useTheme()
  const colors = useMemo(() => defaultGetColor(palette, variant, disabled, active), [
    variant,
    disabled,
    active,
  ])
  return (
    <div className="nav">
      <div className="label">{label}</div>
      {variant === 'line' ? <div className="bottom"></div> : null}
      <style jsx>
        {`
          .nav {
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .label {
            cursor: ${disabled ? 'not-allowed' : ''};
            font-weight: ${active ? '500' : '400'};
            white-space: nowrap;
            line-height: 22px;
            padding: ${layout.gapHalf} ${layout.gap};
            border-radius: ${expressiveness.R2} ${expressiveness.R2} 0px 0px;
            text-align: center;
            color: ${colors.color};
            background-color: ${colors.bgColor};
          }
          .label:hover {
            color: ${colors.hoverColor};
            background-color: ${colors.hoverBgColor};
          }
          .bottom {
            background-color: ${palette.cTheme5};
            transition: all 200ms ease;
            opacity: ${active ? '1' : '0'};
            transform: scale(${active ? '1' : '0.75'});
            height: 4px;
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}

export default Nav
