import { NormalSizes, SelectTypes } from 'components/utils/prop-types'
import { ZeitUIThemes, ZeitUIThemesPalette } from 'components/styles/themes'

export interface SelectSize {
  height: string
  fontSize: string
  minWidth: string
}

type optionColors = {
  color: string
  bgColor: string
  border: string
  hoverColor: string
  hoverBgColor: string
  hoverBorder: string
}

export const getSizes = (theme: ZeitUIThemes, size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SelectSize } = {
    medium: {
      height: `calc(1.969 * ${theme.layout.gap})`,
      fontSize: '1rem',
      minWidth: '10rem',
    },
    small: {
      height: `calc(1.344 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '8rem',
    },
    mini: {
      height: `calc(1 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '6.5rem',
    },
    large: {
      height: `calc(2 * ${theme.layout.gap})`,
      fontSize: '1.225rem',
      minWidth: '12.5rem',
    },
  }

  return size ? sizes[size] : sizes.medium
}

export const getOptionColors = (
  selected: boolean,
  isDisabled: boolean = false,
  palette: ZeitUIThemesPalette,
  isLabel: boolean = false,
  variant: SelectTypes = 'line',
  rgb: number[],
) => {
  const [r, g, b] = rgb
  const colors: { [key in SelectTypes]: optionColors } = {
    line: {
      color: selected ? palette.cNeutral8 : palette.cNeutral6,
      bgColor: selected ? palette.cTheme5 : palette.cNeutral8,
      border: '0',
      hoverColor: palette.cTheme5,
      hoverBgColor: selected ? palette.cTheme5 : `rgba(${r}, ${g}, ${b}, 0.04)`,
      hoverBorder: '0',
    },
    text: {
      color: selected ? palette.cTheme5 : palette.cNeutral6,
      bgColor: palette.cNeutral8,
      border: selected ? `1px solid ${palette.cTheme5}` : `1px solid ${palette.cNeutral8}`,
      hoverColor: palette.cTheme5,
      hoverBgColor: palette.cNeutral8,
      hoverBorder: selected
        ? `1px solid ${palette.cTheme5}`
        : `1px solid rgba(${r}, ${g}, ${b}, 0.12)`,
    },
  }
  if (isDisabled) {
    return {
      color: palette.cNeutral4,
      bgColor: palette.cNeutral3,
      border: '0',
      hoverColor: palette.cNeutral4,
      hoverBgColor: palette.cNeutral3,
      hoverBorder: '0',
    }
  }
  if (isLabel) {
    return {
      color: palette.cNeutral7,
      bgColor: palette.cNeutral8,
      border: '0',
      hoverColor: palette.cNeutral7,
      hoverBgColor: palette.cNeutral8,
      hoverBorder: '0',
    }
  }
  return variant ? colors[variant] : colors.line
}
