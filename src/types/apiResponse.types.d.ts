export interface ApiResponse<T = unknown> {
  isSuccess: SuccessResponse
  code: StatusCode
  message: Message
  result?: T
}
export type ApiResponseObject = ApiResponse<Record<string, never>>
export type ApiResponseString = ApiResponse<string>
