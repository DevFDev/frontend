import { ApiResponse } from '@/types/api/ApiResponse.types'
import { CreatePortfolioRequest } from '@/types/api/Portfolio.types'

import { authProxy } from '@/app/api/auth/authProxy'

export const updateProfile = async (
  data: CreatePortfolioRequest,
  profileImage?: File
): Promise<ApiResponse> => {
  const formData = new FormData()
  formData.append('request', new Blob([JSON.stringify(data)]))

  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  return await authProxy
    .post('v1/portfolio', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .json()
}
