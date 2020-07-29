import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalSizes, NormalTypes } from 'components/utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'

interface Props {
  size?: NormalSizes
  type?: NormalTypes
  color?: string
  width?: string
  height?: string
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  type: 'default' as NormalTypes,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type LoadingProps = Props & typeof defaultProps & NativeAttrs

const getIconSize = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '10px',
    small: '15px',
    medium: '20px',
    large: '25px',
  }
  return sizes[size]
}

const getIconStrokeColor = (type: NormalTypes, palette: ZeitUIThemesPalette, color?: string) => {
  // debugger
  if (color) {
    return color
  } else {
    const colors: { [key in NormalTypes]: string } = {
      default: palette.cNeutral3,
      primary: palette.cTheme5,
      secondary: palette.secondary,
      success: palette.success,
      warning: palette.warning,
      error: palette.error,
    }
    return colors[type]
  }
}

const Loading: React.FC<React.PropsWithChildren<LoadingProps>> = ({
  children,
  size,
  type,
  color,
}) => {
  const theme = useTheme()
  const width = useMemo(() => getIconSize(size), [size])
  color = useMemo(() => getIconStrokeColor(type, theme.palette, color), [
    type,
    theme.palette,
    color,
  ])

  return (
    <div className="loading-container">
      <span className="loading">
        {children && <label>{children}</label>}
        <svg className="svg" width={width} height={width} viewBox="0 0 16 16" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14V16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8H14C14 4.68629 11.3137 2 8 2Z"
            fill={color}
          />
          <path
            d="M15 12.5C15 13.3284 14.3284 14 13.5 14C12.6716 14 12 13.3284 12 12.5C12 11.6716 12.6716 11 13.5 11C14.3284 11 15 11.6716 15 12.5Z"
            fill={color}
          />
        </svg>
      </span>
      <style jsx>{`
        .loading-container {
          display: inline-flex;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }

        label {
          margin-right: 5px;
        }

        .svg {
          animation: loading-rotate 1.4s infinite;
        }

        @keyframes loading-rotate {
          0% {
            transform: rotate(0);
          }

          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

const MemoLoading = React.memo(Loading)

export default withDefaults(MemoLoading, defaultProps)
