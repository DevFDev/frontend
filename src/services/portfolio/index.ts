import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  GetPortfolioDetailResponse,
  GetPortfolioListQuery,
  GetportfolioListResponse,
} from '@/types/api/Portfolio.types'

import { authProxy } from '@/app/api/auth/authProxy'

import { backendApi } from '../api'

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

//프로젝트 게시글 전체 조회
// searchTerm, category, sortBy 는 쿼리 스트링
export const getPortfolioList = async ({
  searchTerm,
  position,
  sortBy,
  page,
  size,
}: GetPortfolioListQuery): Promise<ApiResponse<GetportfolioListResponse>> => {
  return await backendApi
    .get('v1/portfolio', {
      searchParams: {
        searchTerm: searchTerm || '',
        position,
        sortBy,
        page,
        size,
      },
    })
    .json()
}

// 프로젝트 게시글 상세 조회
export const getPortfolio = async (
  PortfolioId: Id
): Promise<ApiResponse<GetPortfolioDetailResponse>> => {
  return await backendApi.get(`v1/portfolio/${PortfolioId}`).json()
}

// 프로젝트 게시글 등록
export const createPortfolio = async (
  data: CreatePortfolioRequest
): Promise<ApiResponse<CreatePortfolioResponse>> => {
  return await backendApi.post('v1/portfolio', { json: data }).json()
}
