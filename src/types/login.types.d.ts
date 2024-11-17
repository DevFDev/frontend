import { SignInRequest } from './auth.types.d'

interface AuthState {
  isAuthenticated: boolean
  user: any | null
  // TODO: 타입 수정
  login: (user: any) => void
  logout: () => void
}

interface SignInRequest {
  email: string
  password: string
}

interface SignInReponse {
  isSuccess: boolean
  code: string
  message: string
  result: any
}
export { AuthState, SignInRequest, SignInReponse }
