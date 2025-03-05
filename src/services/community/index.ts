import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreateCommunityRequest,
  CreateCommunityResponse,
  GetCommunityDetailResponse,
  GetCommunityListQuery,
  GetCommunityListResponse,
  GetCommunityTop5Response,
} from '@/types/api/Community.types'

import { backendApi } from '@/services/api'

//커뮤니티 게시글 전체 조회
// searchTerm, category, sortBy 는 쿼리 스트링
export const getCommunityList = async ({
  searchTerm,
  category,
  sortBy,
}: GetCommunityListQuery): Promise<ApiResponse<GetCommunityListResponse>> => {
  return await backendApi
    .get('v1/community', {
      searchParams: {
        searchTerm: searchTerm || '',
        category,
        sortBy,
      },
    })
    .json()
}

// 커뮤니티 게시글 상세 조회
export const getCommunity = async (
  communityId: Id
): Promise<ApiResponse<GetCommunityDetailResponse>> => {
  return await backendApi.get(`v1/community/${communityId}`).json()
}

// 커뮤니티 게시글 등록
export const createCommunity = async (
  data: CreateCommunityRequest
): Promise<ApiResponse<CreateCommunityResponse>> => {
  return await backendApi.post('v1/community', { json: data }).json()
}

// 커뮤니티 게시글 삭제
export const deleteCommunity = async (
  communityId: Id
): Promise<ApiResponse> => {
  return await backendApi.delete(`v1/community/${communityId}`).json()
}

// //팀 멤버 추가
// export const addTeamMember = async (
//   teamId: Id,
//   data: AddTeamMemberRequest
// ): Promise<ApiResponse<AddTeamMemberResponse>> => {
//   return await backendApi.post(`v1/team/${teamId}/add`, { json: data }).json()
// }

// 인기 커뮤니티 TOP5 유저 조회
export const getCommunityTop5 = async (): Promise<
  ApiResponse<GetCommunityTop5Response>
> => {
  return await backendApi.get(`v1/community/top5`).json()
}

// //팀 멤버 삭제
// export const deleteTeamMember = async (
//   teamId: Id,
//   memberId: Id
// ): Promise<ApiResponse> => {
//   return await backendApi.delete(`v1/team/${teamId}/members/${memberId}`).json()
// }

// //팀 모집글 수정
// export const updateTeamRecruitment = async (
//   teamId: Id,
//   data: UpdateTeamRecruitmentRequest
// ): Promise<ApiResponse<UpdateTeamRecruitmentResponse>> => {
//   return await backendApi.patch(`v1/team/${teamId}`, { json: data }).json()
// }
