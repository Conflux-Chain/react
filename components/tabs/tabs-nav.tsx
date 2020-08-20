import React, { useMemo, useState } from 'react'
import { TabVarient } from '../utils/prop-types'
import { StatusMap, reduceStatus } from './util'
import Bottom from './tabs-bottom'
import Label from './tabs-label'
import { defaultGetColor } from './util'
import useTheme from '../styles/use-theme'

export interface NavCptProps {
  varient: TabVarient
  status: StatusMap
  label: string
}

const Nav: React.FC<NavCptProps> = ({ label, status, varient }) => {
  const [hover, setHover] = useState(false)
  const reducedStatus = useMemo(() => reduceStatus({ ...status, hover }), [status, hover])
  const { palette } = useTheme()
  const colors = useMemo(() => defaultGetColor(palette, varient, reducedStatus), [
    varient,
    reducedStatus,
  ])
  return (
    <div className="nav" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Label status={reducedStatus} varient={varient} colors={colors} label={label} />
      <Bottom status={reducedStatus} varient={varient} />
      <style jsx>
        {`
          .nav {
            display: flex;
            position: relative;
          }
        `}
      </style>
    </div>
  )
}

export default Nav
