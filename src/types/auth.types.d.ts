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
