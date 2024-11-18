export interface SignUpRequest {
  email: Email
  password: Password
  name: Name
  gitHub?: GitHub
}

export interface SignInRequest {
  email: Email
  password: Password
}

export interface SignInResponseResult extends User {
  accessToken: Token
  refreshToken: Token
}

export type SignInResponse = ApiResponse<SignInResponseResult>
