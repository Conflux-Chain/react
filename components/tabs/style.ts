import { TabVarient, TabStatus } from '../utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'
const stack: TabStatus[] = ['disabled', 'active', 'hover', 'default']

export type StatusMap = {
  [key in TabStatus]?: boolean
}

export const defaultGetColor = (
  palette: ZeitUIThemesPalette,
  varient: TabVarient,
  status: TabStatus,
): { color?: string; background: string } => {
  switch (status) {
    case 'active':
    case 'hover':
      return {
        color: palette.cTheme5,
        background: (() => {
          if (varient === 'line') {
            return ''
          } else {
            return status === 'active' ? palette.cTheme2 : palette.cNeutral1
          }
        })(),
      }
    case 'default':
      return {
        color: palette.cNeutral6,
        background: varient === 'solid' ? palette.cNeutral1 : '',
      }
    case 'disabled':
      return {
        color: palette.cNeutral5,
        background: varient === 'solid' ? palette.cNeutral1 : '',
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
