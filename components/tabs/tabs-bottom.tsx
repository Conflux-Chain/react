import React from 'react'

interface BottomProps {
  className: string
  color: string
}

const Bottom: React.FC<React.PropsWithChildren<BottomProps>> = ({ className, color }) => {
  return (
    <div
      className={className}
      style={{
        background: color,
        height: 4,
        width: '100%',
        borderRadius: '4px 4px 0px 0px',
      }}
    />
  )
}

export default Bottom
