import { ApiResponse } from '@/types/api/ApiResponse.types'

import { backendApi } from '../api'

export const getProfile = async (): Promise<ApiResponse> => {
  return await backendApi
    .get(`v1/my-page/profile`, {
      // 인증 토큰 관련 작업 후 진행
      // headers: {
      //   Authorization: `Bearer 토큰 값,
      // },
    })
    .json()
}
