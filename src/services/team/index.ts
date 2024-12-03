import {
  GetTeamDetailResponse,
  GetTeamListResponse,
  GetTeamMembersResponse,
  TeamAddMemberRequest,
  TeamAddMemberResponse,
  TeamCreateRequest,
  TeamCreateResponse,
} from '@/types/api/team.types'

import { backendApi } from '@/services/api'

//팀 모집글 전체 조회
// searchTerm, teamType, positions, techStacks, sortBy, teamIsActive 는 쿼리 스트링
export const GetTeamRecruitmentList = async (): Promise<
  ApiResponse<GetTeamListResponse>
> => {
  return await backendApi.get(`v1/team`).json()
}

//팀 모집글 상세 조회 (여기에서의 id 는 게시글 고유 id 이자 해당 팀 id -> teamId?)
export const GetTeamRecruitment = async (
  teamId: Id
): Promise<ApiResponse<GetTeamDetailResponse>> => {
  return await backendApi.get(`v1/team/${teamId}`).json()
}

//팀 멤버 전체 조회 (teamId : 팀 Id이자, 모집글 id)
export const GetTeamMembers = async (
  teamId: Id
): Promise<ApiResponse<GetTeamMembersResponse>> => {
  return await backendApi.get(`v1/team/${teamId}/members`).json()
}

//팀 모집글 등록
export const CreateTeamRecruitment = async (
  data: TeamCreateRequest
): Promise<ApiResponse<TeamCreateResponse>> => {
  return await backendApi.post(`v1/team`, { json: data }).json()
}

//팀 멤버 추가
export const AddTeamMember = async (
  data: TeamAddMemberRequest,
  teamId: Id
): Promise<ApiResponse<TeamAddMemberResponse>> => {
  return await backendApi.post(`v1/team//${teamId}/add`, { json: data }).json()
}
