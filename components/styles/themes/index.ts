import { ThemeTypes } from '../../utils/prop-types'

export interface ZeitUIThemesPalette {
  /* eslint-disable @typescript-eslint/camelcase */
  accents_1: string
  accents_2: string
  accents_3: string
  accents_4: string
  accents_5: string
  accents_6: string
  accents_7: string
  accents_8: string
  /* eslint-enable camelcase */
  background: string
  foreground: string
  selection: string
  secondary: string
  code: string
  border: string
  success: string
  successLighter: string
  successLight: string
  successDark: string
  error: string
  errorLighter: string
  errorLight: string
  errorDark: string
  warning: string
  warningLighter: string
  warningLight: string
  warningDark: string
  cyan: string
  cyanLighter: string
  cyanLight: string
  cyanDark: string
  violet: string
  violetLighter: string
  violetLight: string
  violetDark: string
  link: string
  purple: string
  magenta: string
  alert: string
  'Ctheme-0': string
  'Ctheme-1': string
  'Ctheme-2': string
  'Ctheme-3': string
  'Ctheme-4': string
  'Ctheme-5': string
  'Ctheme-6': string
  'Ctheme-7': string
  'CBlack-0': string
  'CGray-0': string
  'CGray-1': string
  'CGray-2': string
  'CGray-3': string
  'CGray-4': string
  'CGray-5': string
  'CGray-6': string
  'CWhite-0': string
}

export interface ZeitUIThemesExpressiveness {
  linkStyle: string
  linkHoverStyle: string
  dropdownBoxShadow: string
  scrollerStart: string
  scrollerEnd: string
  shadowSmall: string
  shadowMedium: string
  shadowLarge: string
  portalOpacity: number

  // radius
  R0: string
  R1: string
  R2: string
  R3: string
  R4: string
  R5: string

  // drop shadows
  D1: string
  D2: string
  D3: string
  D4: string
}

export interface ZeitUIThemesLayout {
  gap: string
  gapNegative: string
  gapHalf: string
  gapHalfNegative: string
  gapQuarter: string
  gapQuarterNegative: string
  pageMargin: string
  pageWidth: string
  pageWidthWithMargin: string
  breakpointMobile: string
  breakpointTablet: string
  radius: string
}

export interface ZeitUIThemesFont {
  sans: string
  mono: string
}

export interface BreakpointsItem {
  min: string
  max: string
}

export interface ZeitUIThemesBreakpoints {
  xs: BreakpointsItem
  sm: BreakpointsItem
  md: BreakpointsItem
  lg: BreakpointsItem
  xl: BreakpointsItem
}

export interface ZeitUIThemes {
  type: ThemeTypes
  font: ZeitUIThemesFont
  layout: ZeitUIThemesLayout
  palette: ZeitUIThemesPalette
  breakpoints: ZeitUIThemesBreakpoints
  expressiveness: ZeitUIThemesExpressiveness
}
