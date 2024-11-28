export interface PaginationState {
  currentPage: number // 현재 페이지
  pageButtons: number[] // 현재 페이지 그룹의 버튼 목록
  hasNextPageGroup: boolean // 다음 페이지 그룹 존재 여부
  hasPreviousPageGroup: boolean // 이전 페이지 그룹 존재 여부
  goToPage: (page: number) => void // 특정 페이지로 이동
  goToNextPageGroup: () => void // 다음 페이지 그룹으로 이동
  goToPreviousPageGroup: () => void // 이전 페이지 그룹으로 이동
}
