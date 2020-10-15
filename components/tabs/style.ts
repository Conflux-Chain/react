import { TabVariant } from '../utils/prop-types'
import { CfxUIThemesPalette } from 'components/styles/themes'

type tabColors = {
  color: string
  bgColor: string
  hoverColor: string
  hoverBgColor: string
}

export const defaultGetColor = (
  palette: CfxUIThemesPalette,
  variant: TabVariant,
  disabled: boolean,
  active: boolean,
): tabColors => {
  const isLine = variant === 'line'

  if (disabled) {
    return {
      color: palette.cNeutral5,
      hoverColor: palette.cNeutral5,
      bgColor: isLine ? '' : palette.cNeutral1,
      hoverBgColor: isLine ? '' : palette.cNeutral1,
    }
  }
  if (active) {
    return {
      color: palette.cTheme5,
      hoverColor: palette.cTheme5,
      bgColor: isLine ? '' : palette.cTheme2,
      hoverBgColor: isLine ? '' : palette.cTheme2,
    }
  }
  return {
    color: palette.cNeutral6,
    hoverColor: palette.cTheme5,
    bgColor: isLine ? '' : palette.cNeutral1,
    hoverBgColor: isLine ? '' : palette.cNeutral1,
  }
}
