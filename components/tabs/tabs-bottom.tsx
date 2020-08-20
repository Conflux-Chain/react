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
    <div className="bottom">
      <style jsx>
        {`
          .bottom {
            background-color: ${palette.cTheme5};
            transition: all 200ms ease;
            opacity: ${status === 'active' ? '1' : '0'};
            transform: scale(${status === 'active' ? '1' : '0.75'});
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
