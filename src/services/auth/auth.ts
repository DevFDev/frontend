import { SignInRequest, SignUpRequest } from '@/types/api/Auth.types'
import { AccessTokenResponse, TokenApiResponse } from '@/types/api/Auth.types'

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

export const requestNewToken = async (
  oldAccessToken: Token,
  refreshToken: Token
): Promise<TokenApiResponse<AccessTokenResponse>> => {
  return await proxyApi
    .post('api/auth/refresh', {
      json: {
        oldAccessToken,
        refreshToken,
      },
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      credentials: 'include',
    })
    .json<TokenApiResponse<AccessTokenResponse>>()
}
