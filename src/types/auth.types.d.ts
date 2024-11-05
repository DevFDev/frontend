export interface SignUpRequest {
  email: Email
  password: Password
  name: Name
  gitHub?: GitHub
}

export interface SignInRequest {
  email?: Email
  password?: Password
}
