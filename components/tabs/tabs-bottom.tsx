import React, { useState, useRef, useEffect } from 'react'
interface BottomProps {
  className: string
  color: string
}

const Bottom: React.FC<React.PropsWithChildren<BottomProps>> = ({ className, color }) => {
  const ref = useRef<SVGSVGElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width)
    }
  }, [])
  return (
    <svg
      ref={ref}
      width={width}
      height="6"
      viewBox={`0 0 ${width} 6`}
      fill="none"
      className={className}>
      <path
        d={`M0 5C0 2 2 0 5 0H${width - 5}C${width - 2} 0 ${width} 2 ${width} 5V6H0V5Z`}
        fill={color}
      />
    </svg>
  )
}

export default Bottom
