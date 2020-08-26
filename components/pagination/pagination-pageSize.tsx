import React, { ReactNode, forwardRef } from 'react'
import Select from '../select'
import { NormalSizes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import { getPageCount } from './utils'
import { usePaginationContext } from './pagination-context'
interface Props {
  pageSizeOptions: string[]
  size?: NormalSizes
  total?: number
  current: number
  labelPageSizeBefore?: ReactNode | string
  labelPageSizeAfter?: ReactNode | string
  onPageSizeChange?: (current: number, pageSize: number) => void
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  total: 0,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationPageSizeProps = React.PropsWithChildren<Props & NativeAttrs>
const PaginationNext: React.FC<PaginationPageSizeProps> = ({
  pageSizeOptions,
  size,
  total,
  current,
  labelPageSizeBefore,
  labelPageSizeAfter,
  onPageSizeChange,
}: PaginationPageSizeProps & typeof defaultProps) => {
  const theme = useTheme()
  const placeHolderVal = pageSizeOptions[0]
  const { update, updatePageSize } = usePaginationContext()
  const changeHandler = (val: string) => {
    const pageSize = Number(val)
    const newPageCount = getPageCount(total, pageSize)
    const newCurrent = current > newPageCount ? newPageCount : current
    console.log('newCurrent', newCurrent)
    update && update('click', newCurrent)
    updatePageSize && updatePageSize(pageSize)
    onPageSizeChange && onPageSizeChange(newCurrent, pageSize)
  }
  return (
    <div className="pagination-pagesize">
      <div className="text before">{labelPageSizeBefore}</div>
      <Select
        variant="line"
        size={size}
        onChange={changeHandler}
        placeholder={placeHolderVal}
        defaultValue={placeHolderVal}>
        {pageSizeOptions?.map(pageSize => {
          return (
            <Select.Option value={pageSize} key={pageSize}>
              {pageSize}{' '}
            </Select.Option>
          )
        })}
      </Select>
      <div className="text after">{labelPageSizeAfter}</div>
      <style jsx>
        {`
          .pagination-pagesize {
            display: flex;
            align-items: center;
            font-size: inherit;
          }
          .pagination-pagesize .text {
            color: ${theme.palette.cNeutral6};
            font-weight: 500;
          }
          .pagination-pagesize .before {
            margin-right: ${theme.layout.gapHalf};
          }
          .pagination-pagesize .after {
            margin-left: ${theme.layout.gapHalf};
          }
        `}
      </style>
    </div>
  )
}

export default PaginationNext
