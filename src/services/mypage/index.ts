import { ApiResponse } from '@/types/api/ApiResponse.types'
import { ProfileBase } from '@/types/api/MyPage.types'

import { authProxy } from '@/app/api/auth/authProxy'

export const getProfile = async (): Promise<ApiResponse> => {
  return await authProxy.get(`v1/my-page/profile`).json()
}

export const updateProfile = async (
  data: ProfileBase
): Promise<ApiResponse> => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item))
    } else {
      formData.append(key, value as string)
    }
  })

  return await authProxy
    .patch('v1/my-page/profile', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .json()
}
