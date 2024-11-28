import { IcChevronLeft, IcChevronRight } from '@/assets/IconList'
import { twMergeEx } from '@/lib/twMerge'
import type { UsePaginationReturn } from '@/types/hooks'

import { Button } from '@/components/common/button'

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
  goToPage,
  goToNextPageGroup,
  goToPreviousPageGroup,
}: UsePaginationReturn): JSX.Element => {
  return (
    <div className='flex items-center gap-20'>
      <Button
        variant='text'
        onClick={goToPreviousPageGroup}
        className={defaultPageButtonClass}
        disabled={!hasPreviousPageGroup}
      >
        <IcChevronLeft />
      </Button>
      {pageButtons.map(page => (
        <Button
          variant='text'
          key={page}
          onClick={() => goToPage(page)}
          className={getPageButtonClass(page, currentPage)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant='text'
        onClick={goToNextPageGroup}
        className={defaultPageButtonClass}
        disabled={!hasNextPageGroup}
      >
        <IcChevronRight />
      </Button>
    </div>
  )
}
