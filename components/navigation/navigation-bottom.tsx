import React from 'react'
import useTheme from '../styles/use-theme'
import { BottomCpt } from '../tabs/tabs-bottom'

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
            height: 4px;
            width: 100%;
          }
        `}
      </style>
    </div>
  ) : null
}

export default Bottom
