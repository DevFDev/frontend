interface ApiResponse<T = unknown> {
  isSuccess: boolean // 요청 성공 여부
  code: string // 응답 코드 (예: TEAM004)
  message: string // 응답 메시지 (예: "This is a deleted post.")
  result?: T // 응답 데이터 (제네릭 타입)
}
