import { CardColors, CardVariants } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export type CardStyles = {
  color: string
  bgColor: string
  borderColor: string
}

export const getStyles = (
  customColor: CardColors,
  palette: ZeitUIThemesPalette,
  variant: CardVariants,
): CardStyles => {
  const solidColors: { [key in CardColors]: Omit<CardStyles, 'borderColor'> } = {
    default: {
      color: palette.cNeutral7,
      bgColor: palette.cNeutral8,
    },
    primary: {
      color: palette.cNeutral7,
      bgColor: palette.cTheme0,
    },
    secondary: {
      color: palette.cNeutral8,
      bgColor: palette.secondary,
    },
    success: {
      color: palette.cNeutral7,
      bgColor: palette.success,
    },
    warning: {
      color: palette.cNeutral7,
      bgColor: palette.warning,
    },
    error: {
      color: palette.cNeutral7,
      bgColor: palette.error,
    },
    dark: {
      color: palette.cNeutral8,
      bgColor: palette.cNeutral7,
    },
  }

  const lineColors: { [key in CardColors]: Omit<CardStyles, 'bgColor'> } = {
    default: {
      color: palette.cNeutral7,
      borderColor: palette.border,
    },
    primary: {
      color: palette.cNeutral7,
      borderColor: palette.cTheme5,
    },
    secondary: {
      color: palette.cNeutral7,
      borderColor: palette.secondary,
    },
    success: {
      color: palette.cNeutral7,
      borderColor: palette.success,
    },
    warning: {
      color: palette.cNeutral7,
      borderColor: palette.warning,
    },
    error: {
      color: palette.cNeutral7,
      borderColor: palette.error,
    },
    dark: {
      color: palette.cNeutral7,
      borderColor: palette.cNeutral7,
    },
  }

  if (variant === 'solid') {
    const showBorder = customColor === 'default'
    return {
      ...solidColors[customColor],
      borderColor: showBorder ? palette.border : 'transparent',
    }
  } else {
    return {
      ...lineColors[customColor],
      bgColor: palette.cNeutral8,
    }
  }
}
