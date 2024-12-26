import { SignInRequest, SignUpRequest } from '@/types/api/Auth.types'

import { backendApi, proxyApi } from '@/services/api'

export const SignUp = async (data: SignUpRequest): Promise<Response> => {
  return await backendApi.post(`v1/auth/sign-up`, { json: data }).json()
}

export const SignIn = async (data: SignInRequest): Promise<Response> => {
  return await proxyApi.post(`api/auth/sign-in`, { json: data }).json()
}

export const SignOut = async (): Promise<Response> => {
  return await proxyApi.post(`api/auth/sign-out`)
}

//사용하지 않아도 됨

export const refreshAuth = async (
  oldAccessToken: Token,
  refreshToken: Token
): Promise<Response> => {
  return await proxyApi.post(`api/auth/refresh`, {
    json: {
      oldAccessToken,
      refreshToken,
    },
  })
}
