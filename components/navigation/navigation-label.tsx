import React from 'react'
import useDOMDimension from '../utils/use-dom-dimension'
import { useExtraStyle, LabelCpt } from '../tabs/tabs-label'

const Label: LabelCpt = ({ label, varient, status, colors }) => {
  /**
   * The width of a shink-to-fit element is subject to change,
   * i.e. "font-weight:bold" can change the width which cause an
   * unexpect visual effect
   */
  const [width, ref] = useDOMDimension<HTMLDivElement>('offsetWidth')
  const extra = useExtraStyle(varient, status)
  return (
    <div style={{ ...colors, ...extra, width: width ? width : '' }} ref={ref} className="label">
      {label}
      <style jsx>{`
            .label{
                box-sizing:content-box;
              white-space:nowrap;
              transition:none;
              padding: 9px 16px;
              height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            }
          }
          `}</style>
    </div>
  )
}

export default Label
