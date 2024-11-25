/*
path: '/v1/auth'
GET: 로그인한 유저 조회
*/
export type GetMemberInfoResult = User

/*
path: '/v1/auth/sign-up'
POST: 회원가입
*/
export interface SignUpRequest {
  email: Email
  password: Password
  name: Name
  gitHub: GitHub
}
export interface SignUpResponse extends User {
  gitHub: GitHub
}

/*
path: '/v1/auth/sign-in'
POST: 로그인
*/
export interface SignInRequest {
  email: Email
  password: Password
}
export interface SignInResponseResult extends User {
  accessToken: Token
  refreshToken: Token
}
