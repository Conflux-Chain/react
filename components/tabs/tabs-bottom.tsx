import React from 'react'
import { TabStatus, TabVarient } from 'components/utils/prop-types'
import useTheme from '../styles/use-theme'

export type BottomCpt = React.FC<{
  status: TabStatus
  varient: TabVarient
}>

const Bottom: BottomCpt = ({ varient, status }) => {
  const { palette } = useTheme()
  return varient === 'line' ? (
    <div
      className="bottom"
      style={{
        backgroundColor: palette.cTheme0,
        opacity: status === 'active' ? '1' : '0',
        transform: status === 'active' ? '1' : '0.75',
      }}>
      <style jsx>
        {`
          .bottom {
            transition: all 200ms ease;
            height: 8px;
            width: 100%;
            border-radius: 4px 4px 0px 0px;
          }
        `}
      </style>
    </div>
  ) : null
}

export default Bottom
