interface ApiResponse<T = unknown> {
  isSuccess: SuccessResponse
  code: StatusCode
  message: Message
  result?: T
}
type ApiResponseObject = ApiResponse<Record<string, never>>
type ApiResponseString = ApiResponse<string>
