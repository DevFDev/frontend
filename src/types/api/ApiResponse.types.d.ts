/** 
- isSuccess: 요청 성공 여부
- code: 응답 코드 (예: TEAM004)
- message: 응답 메시지 (예: "This is a deleted post.")
- result?: 응답 데이터 (제네릭 타입)
*/
interface ApiResponse<T = unknown> {
  isSuccess: boolean
  code: string
  message: string
  result?: T
}
