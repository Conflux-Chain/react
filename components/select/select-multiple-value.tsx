import React from 'react'
import useTheme from '../styles/use-theme'
import Grid from '../grid'

interface Props {
  disabled: boolean
  size: string
}

const SelectMultipleValue: React.FC<React.PropsWithChildren<Props>> = ({
  disabled,
  size,
  children,
}) => {
  const theme = useTheme()

  return (
    <Grid>
      <div className="item">{children}</div>
      <style jsx>{`
        .item {
          display: inline-flex;
          height: calc(${size} * 2);
          align-items: center;
          line-height: 1;
          padding: 0 0.5rem;
          font-size: ${size};
          border-radius: ${theme.expressiveness.R2};
          background-color: ${theme.palette.cNeutral2};
          color: ${disabled ? theme.palette.cNeutral4 : theme.palette.cNeutral6};
        }

        .item > :global(div),
        .item > :global(div:hover) {
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          margin: 0;
          color: inherit;
        }
      `}</style>
    </Grid>
  )
}

export default SelectMultipleValue
