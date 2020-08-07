import { TabVarient, TabStatus } from '../utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'
const stack: TabStatus[] = ['disabled', 'active', 'hover', 'default']

export type StatusMap = {
  [key in TabStatus]?: boolean
}

export type ColorFN = (palette: ZeitUIThemesPalette, varient: TabVarient, status: TabStatus) => any

export const defaultGetColor: any = (
  palette: ZeitUIThemesPalette,
  varient: TabVarient,
  status: TabStatus,
) => {
  if (status === 'active' || status === 'hover') {
    return {
      color: palette.cTheme5,
      background:
        varient === 'line' ? '' : status === 'active' ? palette.cTheme0 : palette.cNeutral1,
    }
  } else if (status === 'default') {
    return {
      color: palette.cNeutral6,
      background: varient === 'solid' ? palette.cNeutral1 : '',
    }
  } else if (status === 'disabled') {
    return {
      color: palette.cNeutral5,
      background: varient === 'solid' ? palette.cNeutral0 : '',
    }
  }
}

export function reduceStatus(props: StatusMap): TabStatus {
  for (let i = 0; i <= stack.length; i++) {
    const s = stack[i]
    if (props[s]) {
      return s
    }
  }
  return 'default'
}
