/*
path: '/v1/auth'
GET: 로그인한 유저 조회
*/
export type GetLoggedInUserResponse = User

/*
path: '/v1/auth/sign-up'
POST: 회원가입
*/
export interface SignUpRequest {
  email: Email // 이메일
  password: Password // 비밀번호
  name: Name // 사용자 이름
  gitHub: GitHub // GitHub 계정 URL
}
export interface SignUpResponse extends User {
  gitHub: GitHub // GitHub 계정 URL
}

/*
path: '/v1/auth/sign-in'
POST: 로그인
*/
export interface SignInRequest {
  email: Email // 이메일
  password: Password // 비밀번호
}

export interface SignInResponse extends User {
  accessToken: Token // 액세스 토큰
  refreshToken: Token // 리프레시 토큰
}

/*
path: '/v1/auth/new-token'
POST: 액세스 토큰 재발급
*/
export interface RefreshTokenRequest {
  oldAccessToken: Token // 기존의 access token
  refreshToken: Token // refresh token
}
export interface AccessTokenResponse {
  accessToken: Token // 신규 access token
}

/*
path: '/v1/auth/check-email'
POST: 이메일 중복 체크
*/
export interface CheckEmailRequest {
  email: Email // 검사하고자 하는 이메일
}
export type CheckEmailResponse = boolean

/*
path: '/v1/my-page/password'
PATCH: 마이 페이지 비밀번호 수정
*/
export interface PasswordUpdateRequest {
  password: Password // 새 비밀번호
}

/*
PasswordUpdateResponse
{
  "isSuccess": true,
  "code": "COMMON200",
  "message": "비밀번호 수정이 완료되었습니다."
}
*/
