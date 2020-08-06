
import React, { useMemo, useState } from 'react'
import { TabVarient } from '../utils/prop-types'
import { StatusMap, reduceStatus, defaultGetColor, ColorFN } from './util'
import DefaultBottom, { BottomCpt } from './tabs-bottom'
import useTheme from '../styles/use-theme'

export interface LabelCptProps {
    varient: TabVarient
    status: StatusMap
    label: string,
}


export const nav = ({ getColor = defaultGetColor, Bottom = DefaultBottom }:
    { getColor?: ColorFN, Bottom?: BottomCpt }) => {
    const Nav: React.FC<LabelCptProps> = ({ label, status, varient }) => {
        const [hover, setHover] = useState(false)
        const { palette } = useTheme()
        const computeStatus = useMemo(() => reduceStatus({ ...status, hover }), [status, hover])

        const styles = useMemo(() => getColor(palette, varient, computeStatus), [
            varient,
            computeStatus,
        ])

        return (
            <div
                className="nav"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ ...styles }}>
                {label}
                <Bottom
                    status={computeStatus}
                    varient={varient}
                    className="bottom"
                />
                <style jsx>{`
            .nav{
              padding: 9px 16px;
              border-radius: 4px 4px 0px 0px;
            }
          }
          `}</style>
            </div>
        )

    }
    return Nav
}


export default nav({})