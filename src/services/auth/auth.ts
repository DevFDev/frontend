import { SignInRequest, SignUpRequest } from '@/types/auth.types'

import { backendApi, proxyApi } from '@/services/api'

export const SignUp = async (data: SignUpRequest): Promise<Response> => {
  return await backendApi.post(`/v1/auth/sign-up`, { json: data }).json()
}

export const SignIn = async (data: SignInRequest): Promise<Response> => {
  return await proxyApi.post(`/api/auth/sign-in`, { json: data }).json()
}

export const SignOut = async () => {
  return await proxyApi.post(`/api/auth/sign-out`).json()
}
