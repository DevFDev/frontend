import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from '@/types/auth.types'

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
export const SignUp = async (data: SignUpRequest): Promise<Response> => {
  return await fetch(`${BACKEND_BASE_URL}/v1/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const SignIn = async (data: SignInRequest): Promise<Response> => {
  return await fetch(`/api/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const SignOut = async () => {
  return await fetch(`/api/auth/sign-out`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
}
