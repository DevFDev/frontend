export interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  buttonsPerPage?: number
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  buttonsPerPage = 10,
}: UsePaginationProps): {
  currentPage: number
  pageButtons: number[]
  hasNextPageGroup: boolean
  hasPreviousPageGroup: boolean
  nextGroupFirstPage: number
  prevGroupLastPage: number
} => {
  if (totalItems < 0 || itemsPerPage <= 0 || buttonsPerPage <= 0) {
    throw new Error('0보다 같거나 작은 페이지를 인자로 전달할 수 없습니다.')
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const totalGroups = Math.ceil(totalPages / buttonsPerPage)

  const currentGroupIndex = Math.floor((currentPage - 1) / buttonsPerPage)

  const firstPageInGroup = currentGroupIndex * buttonsPerPage + 1
  const lastPageInGroup = Math.min(
    firstPageInGroup + buttonsPerPage - 1,
    totalPages
  )

  const pageButtons = Array.from(
    { length: lastPageInGroup - firstPageInGroup + 1 },
    (_, idx) => firstPageInGroup + idx
  )

  const hasNextPageGroup = currentGroupIndex < totalGroups - 1
  const hasPreviousPageGroup = currentGroupIndex > 0

  const nextGroupFirstPage = (currentGroupIndex + 1) * buttonsPerPage + 1
  const prevGroupLastPage =
    (currentGroupIndex - 1) * buttonsPerPage + buttonsPerPage

  return {
    currentPage,
    pageButtons,
    hasNextPageGroup,
    hasPreviousPageGroup,
    nextGroupFirstPage,
    prevGroupLastPage,
  }
}
