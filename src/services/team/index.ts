import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  AddTeamMemberRequest,
  AddTeamMemberResponse,
  CreateTeamRecruitmentRequest,
  CreateTeamRecruitmentResponse,
  GetTeamMembersResponse,
  GetTeamRecruitmentListResponse,
  GetTeamRecruitmentResponse,
  SearchMembersResponse,
  UpdateTeamRecruitmentRequest,
  UpdateTeamRecruitmentResponse,
} from '@/types/api/Team.types'

import { backendApi } from '@/services/api'

//팀 모집글 전체 조회
// searchTerm, teamType, positions, techStacks, sortBy, teamIsActive 는 쿼리 스트링
export const getTeamRecruitmentList = async (): Promise<
  ApiResponse<GetTeamRecruitmentListResponse>
> => {
  return await backendApi.get('v1/team').json()
}

//팀 모집글 상세 조회 (여기에서의 id 는 게시글 고유 id 이자 해당 팀 id -> teamId?)
export const getTeamRecruitment = async (
  teamId: Id
): Promise<ApiResponse<GetTeamRecruitmentResponse>> => {
  return await backendApi.get(`v1/team/${teamId}`).json()
}

//팀 멤버 전체 조회 (teamId : 팀 Id이자, 모집글 id)
export const getTeamMembers = async (
  teamId: Id
): Promise<ApiResponse<GetTeamMembersResponse>> => {
  return await backendApi.get(`v1/team/${teamId}/members`).json()
}

//맴버 리스트 검색 (teamId : 팀 Id) -> 전체 멤버를 조회할 수 있도록 (nickname을 입력하지 않고도)
export const searchMembers = async (
  teamId: Id,
  nickname?: string
): Promise<ApiResponse<SearchMembersResponse>> => {
  const url = nickname
    ? `v1/team/${teamId}/search-members?nickname=${nickname}`
    : `v1/team/${teamId}/search-members`
  return await backendApi.get(url).json()
}

//팀 모집글 등록
export const createTeamRecruitment = async (
  data: CreateTeamRecruitmentRequest
): Promise<ApiResponse<CreateTeamRecruitmentResponse>> => {
  return await backendApi.post('v1/team', { json: data }).json()
}

//팀 멤버 추가
export const addTeamMember = async (
  teamId: Id,
  data: AddTeamMemberRequest
): Promise<ApiResponse<AddTeamMemberResponse>> => {
  return await backendApi.post(`v1/team/${teamId}/add`, { json: data }).json()
}

//팀원 모집 마감
export const closeTeamRecruitment = async (
  teamId: Id
): Promise<ApiResponse> => {
  return await backendApi.patch(`v1/team/${teamId}/close`).json()
}

//팀원 모집글 삭제
export const deleteTeamRecruitment = async (
  teamId: Id
): Promise<ApiResponse> => {
  return await backendApi.delete(`v1/team/${teamId}`).json()
}

//팀 멤버 삭제
export const deleteTeamMember = async (
  teamId: Id,
  memberId: Id
): Promise<ApiResponse> => {
  return await backendApi.delete(`v1/team/${teamId}/members/${memberId}`).json()
}

//팀 모집글 수정
export const updateTeamRecruitment = async (
  teamId: Id,
  data: UpdateTeamRecruitmentRequest
): Promise<ApiResponse<UpdateTeamRecruitmentResponse>> => {
  return await backendApi.patch(`v1/team/${teamId}`, { json: data }).json()
}
