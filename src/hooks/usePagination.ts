import { useState } from 'react'

import type { PaginationState } from '@/types/hooks'

interface UsePaginationProps {
  totalItems: number // 전체 아이템 수
  itemsPerPage: number // 페이지당 아이템 수
  buttonsPerPage?: number // 한 번에 보여줄 페이지네이션 버튼 수 (기본값: 10)
}

export function usePagination({
  totalItems,
  itemsPerPage,
  buttonsPerPage = 10,
}: UsePaginationProps): PaginationState {
  if (totalItems <= 0 || itemsPerPage <= 0 || buttonsPerPage <= 0) {
    throw new Error('0보다 같거나 작은 페이지를 인자로 전달할 수 없습니다.')
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage) // 총 페이지 수
  const totalGroups = Math.ceil(totalPages / buttonsPerPage) // 총 그룹 수
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0) // 현재 페이지 그룹 인덱스

  const firstPageInGroup = currentGroupIndex * buttonsPerPage + 1
  const lastPageInGroup = Math.min(
    firstPageInGroup + buttonsPerPage - 1,
    totalPages
  )

  // 현재 그룹에 표시될 페이지 번호 계산
  const pageButtons = Array.from(
    { length: lastPageInGroup - firstPageInGroup + 1 },
    (_, idx) => firstPageInGroup + idx
  )

  const hasNextPageGroup = currentGroupIndex < totalGroups - 1
  const hasPreviousPageGroup = currentGroupIndex > 0

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      console.warn('Invalid page number')
      return
    }
    setCurrentPage(page)
  }

  const goToNextPageGroup = () => {
    if (hasNextPageGroup) {
      setCurrentGroupIndex(prev => prev + 1)
      setCurrentPage((currentGroupIndex + 1) * buttonsPerPage + 1)
    }
  }

  const goToPreviousPageGroup = () => {
    if (hasPreviousPageGroup) {
      setCurrentGroupIndex(prev => prev - 1)
      setCurrentPage((currentGroupIndex - 1) * buttonsPerPage + buttonsPerPage)
    }
  }

  return {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    goToPage,
    goToNextPageGroup,
    goToPreviousPageGroup,
  }
}
