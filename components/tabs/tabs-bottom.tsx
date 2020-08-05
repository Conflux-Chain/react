import React from 'react'

const Bottom: React.FC<React.PropsWithChildren<{
  className: string
  color: string
}>> = ({ className, color }) => {
  return (
    <div
      className={className}
      style={{
        background: color,
        height: 8,
        width: '100%',
        borderRadius: '4px 4px 0px 0px',
      }}
    />
  )
}

export default Bottom
