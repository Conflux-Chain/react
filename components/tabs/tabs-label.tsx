import React, { useMemo, useEffect, useRef, useState, CSSProperties } from 'react'
import { TabStatus, TabVarient } from 'components/utils/prop-types'
export type LabelCpt = React.FC<{
  label: string
  status: TabStatus
  varient: TabVarient
  colors: any
}>

type CSS = { [key in keyof CSSProperties]: CSSProperties[key] }
const Label: LabelCpt = ({ label, varient, status, colors }) => {
  const [width, ref] = useFixedWidth<HTMLDivElement>()
  // console.log('width', width)
  const extra = useExtraStyle(varient, status)
  return (
    <div style={{ ...colors, ...extra, width: width ? width : '' }} ref={ref} className="label">
      {label}
      <style jsx>{`
            .label{
              white-space:nowrap;
              transition:none;
              padding: 9px 16px;
              border-radius: 4px 4px 0px 0px;
              text-align:center
            }
          }
          `}</style>
    </div>
  )
}

export default Label

function useExtraStyle(varient: TabVarient, status: TabStatus) {
  const extra = useMemo<CSS>(() => {
    const result: CSS = {}
    if (status === 'disabled') {
      result.cursor = 'not-allowed'
    } else if (['active', 'hover'].indexOf(status) > -1) {
      result.fontWeight = 'bold'
    }
    return result
  }, [varient, status])
  return extra
}

/**
 * The width of a shink-to-fit element is subject to change, i.e. font-weight:bold
 * We avoid the unexpect visual effect by fixing the with
 */
export function useFixedWidth<E extends HTMLElement>(
  ...gurads: any[]
): [number, React.RefObject<E>] {
  const ref = useRef<E>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    // console.log(ref.current)
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
  }, [...gurads])
  return [width, ref]
}
