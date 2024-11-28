import { IcChevronLeft, IcChevronRight } from '@/assets/IconList'
import clsx from 'clsx'

import { Button } from '@/components/common/button'

interface PaginationProps {
  currentPage: number // 현재 페이지
  pageButtons: number[] // 현재 그룹의 버튼 목록
  hasNextPageGroup: boolean // 다음 페이지 그룹 존재 여부
  hasPreviousPageGroup: boolean // 이전 페이지 그룹 존재 여부
  goToPage: (page: number) => void // 특정 페이지로 이동
  goToNextPageGroup: () => void // 다음 페이지 그룹으로 이동
  goToPreviousPageGroup: () => void // 이전 페이지 그룹으로 이동
}

const baseStyle =
  'flex h-24 w-24 items-center justify-center bg-common-white p-0 text-body3 text-gray-600'
const defaultPageButtonClass = clsx(baseStyle, 'hover:bg-gray-100')
const currentPageButtonClass = clsx(
  baseStyle,
  'bg-primary-normal text-common-white'
)
export const Pagination = ({
  currentPage,
  pageButtons,
  hasNextPageGroup,
  hasPreviousPageGroup,
  goToPage,
  goToNextPageGroup,
  goToPreviousPageGroup,
}: PaginationProps): JSX.Element => {
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
          className={
            currentPage === page
              ? currentPageButtonClass
              : defaultPageButtonClass
          }
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
