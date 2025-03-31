import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectDetailResponse,
  GetProjectListQuery,
  GetProjectListResponse,
} from '@/types/api/Project.types'

import { backendApi } from '@/services/api'

//프로젝트 게시글 전체 조회
// searchTerm, category, sortBy 는 쿼리 스트링
export const getProjectList = async ({
  searchTerm,
  projectCategory,
  sortBy,
  page,
  size,
}: GetProjectListQuery): Promise<ApiResponse<GetProjectListResponse>> => {
  return await backendApi
    .get('v1/project', {
      searchParams: {
        searchTerm: searchTerm || '',
        projectCategory,
        sortBy,
        page,
        size,
      },
    })
    .json()
}

// 프로젝트 게시글 상세 조회
export const getProject = async (
  ProjectId: Id
): Promise<ApiResponse<GetProjectDetailResponse>> => {
  return await backendApi.get(`v1/project/${ProjectId}`).json()
}

// 프로젝트 게시글 등록
export const createProject = async (
  data: CreateProjectRequest
): Promise<ApiResponse<CreateProjectResponse>> => {
  return await backendApi.post('v1/project', { json: data }).json()
}

// // 프로젝트 게시글 수정
// export const updateProject = async (
//   ProjectId: Id,
//   data: UpdateProjectRequest
// ): Promise<ApiResponse<UpdateProjectResponse>> => {
//   return await backendApi
//     .patch(`v1/project/${ProjectId}`, { json: data })
//     .json()
// }

// // 프로젝트 게시글 삭제
// export const deleteProject = async (
//   ProjectId: Id
// ): Promise<ApiResponse> => {
//   return await backendApi.delete(`v1/project/${ProjectId}`).json()
// }

// // //팀 멤버 추가
// // export const addTeamMember = async (
// //   teamId: Id,
// //   data: AddTeamMemberRequest
// // ): Promise<ApiResponse<AddTeamMemberResponse>> => {
// //   return await backendApi.post(`v1/team/${teamId}/add`, { json: data }).json()
// // }

// // 인기 프로젝트 TOP5 유저 조회
// export const getProjectTop5 = async (): Promise<
//   ApiResponse<GetProjectTop5Response>
// > => {
//   return await backendApi.get(`v1/project/top5`).json()
// }

// // //팀 멤버 삭제
// // export const deleteTeamMember = async (
// //   teamId: Id,
// //   memberId: Id
// // ): Promise<ApiResponse> => {
// //   return await backendApi.delete(`v1/team/${teamId}/members/${memberId}`).json()
// // }
