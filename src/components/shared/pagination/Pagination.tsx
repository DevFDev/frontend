import { IcChevronLeft, IcChevronRight } from '@/assets/IconList'
import { twMergeEx } from '@/lib/twMerge'

import { Button } from '@/components/common/button'

interface PaginationProps {
  currentPage: number
  pageButtons: number[]
  hasNextPageGroup: boolean
  hasPreviousPageGroup: boolean
  nextGroupFirstPage: number
  prevGroupLastPage: number
  onPageChange: (page: number) => void
}

const baseStyle =
  'flex h-24 w-24 items-center justify-center bg-common-white p-0 text-body3 text-gray-600'
const defaultPageButtonClass = twMergeEx(baseStyle, 'hover:bg-gray-100')
const currentPageButtonClass = twMergeEx(
  baseStyle,
  'bg-primary-normal text-common-white'
)

const getPageButtonClass = (page: number, currentPage: number): string =>
  currentPage === page ? currentPageButtonClass : defaultPageButtonClass

export const Pagination = ({
  currentPage,
  pageButtons,
  hasNextPageGroup,
  hasPreviousPageGroup,
  nextGroupFirstPage,
  prevGroupLastPage,
  onPageChange,
}: PaginationProps): JSX.Element => {
  return (
    <div className='flex items-center justify-center gap-20'>
      <Button
        variant='text'
        onClick={() => onPageChange(prevGroupLastPage)}
        className={defaultPageButtonClass}
        disabled={!hasPreviousPageGroup}
      >
        <IcChevronLeft />
      </Button>
      {pageButtons.map(page => (
        <Button
          variant='text'
          key={page}
          onClick={() => onPageChange(page)}
          className={getPageButtonClass(page, currentPage)}
          aria-label={`${page}번 페이지로 이동`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}
      <Button
        variant='text'
        onClick={() => onPageChange(nextGroupFirstPage)}
        className={defaultPageButtonClass}
        disabled={!hasNextPageGroup}
      >
        <IcChevronRight />
      </Button>
    </div>
  )
}
