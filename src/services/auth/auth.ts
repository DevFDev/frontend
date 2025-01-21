import {
  CheckEmailResponse,
  SignInRequest,
  SignUpRequest,
} from '@/types/api/Auth.types'
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

/**
 * 이메일 중복 체크 요청
 * @param email - 검사하고자 하는 이메일
 * @returns 이메일 사용 가능 여부 (true: 사용 가능, false: 중복)
 */
export const checkEmailDuplication = async (
  email: string
): Promise<CheckEmailResponse> => {
  return await backendApi.post(`v1/auth/check-email`, { json: email }).json()
}
