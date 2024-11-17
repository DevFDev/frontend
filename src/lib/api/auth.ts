import { SignInReponse, SignInRequest } from '@/types/login.types'
import axios from 'axios'

// 환경 변수에서 API BASE URL 가져오기
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!BASE_URL) {
  throw new Error("환경 변수 'NEXT_PUBLIC_API_BASE_URL'이 정의되지 않았습니다.")
}

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  //   withCredentials: true,
})

// 로그인 요청 처리
export const signIn = async (data: SignInRequest): Promise<SignInReponse> => {
  try {
    const response = await apiClient.post('/v1/auth/sign-in', data, {
      //   withCredentials: true,
    })
    console.log('로그인 성공:', response.data)
    return response.data
    console.log(response.data.result)
  } catch (error) {
    console.error('로그인 실패:', (error as Error).message)
    throw error // 에러를 호출자에게 전달
  }
}
