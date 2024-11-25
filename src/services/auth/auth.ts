import { SignInRequest, SignInResponse } from '@/types/auth.types'
import axios, { AxiosResponse } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!BASE_URL) {
  throw new Error("환경 변수 'NEXT_PUBLIC_API_BASE_URL'이 정의되지 않았습니다.")
}

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  //   withCredentials: true,
})

export const signIn = async (
  data: SignInRequest
): Promise<AxiosResponse<SignInResponse>> => {
  return await apiClient.post<SignInResponse>('/v1/auth/sign-in', data, {
    // withCredentials: true, //
  })
}

export const signOut = async () => {
  return await axios.post('/v1/auth/logout', {}, { withCredentials: true })
}
