import React, { useMemo, CSSProperties } from 'react'
import { TabStatus, TabVarient } from 'components/utils/prop-types'
import useDOMDimension from '../utils/use-dom-dimension'
import useTheme from '../styles/use-theme'
export type LabelCpt = React.FC<{
  label: string
  status: TabStatus
  varient: TabVarient
  colors: any
}>

const Label: LabelCpt = ({ label, varient, status, colors }) => {
  /**
   * The width of a shink-to-fit element is subject to change,
   * i.e. "font-weight:bold" can change the width which cause an
   * unexpect visual effect
   */
  const [width, ref] = useDOMDimension<HTMLDivElement>('offsetWidth')
  const extra = useExtraStyle(varient, status)
  const { layout, expressiveness } = useTheme()

  return (
    //width is 0 forever due to jest contraint (i.e. no css dom)
    <div style={{ ...colors, ...extra, width: width ? width : '' }} ref={ref} className="label">
      {label}
      <style jsx>{`
            .label{
              white-space:nowrap;
              transition:none;
              line-height:22px;
              padding: ${layout.gapHalf} ${layout.gap};
              border-radius: ${expressiveness.R2} ${expressiveness.R2} 0px 0px;
              text-align:center
            }
          }
          `}</style>
    </div>
  )
}

export default Label

export function useExtraStyle(varient: TabVarient, status: TabStatus) {
  const extra = useMemo<CSSProperties>(() => {
    const result: CSSProperties = {}
    if (status === 'disabled') {
      result.cursor = 'not-allowed'
    } else if (['active', 'hover'].indexOf(status) > -1) {
      result.fontWeight = 'bold'
    }
    return result
  }, [varient, status])
  return extra
}
