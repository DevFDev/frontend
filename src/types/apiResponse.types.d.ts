interface ApiResponse<T = unknown> {
  isSuccess: boolean
  code: string // 예시) TEAM004
  message: string // 예시) "This is a deleted post."
  result?: T
}
type ApiResponseObject = ApiResponse<Record<string, never>>
type ApiResponseString = ApiResponse<string>
