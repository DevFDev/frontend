import {
  GetTeamDetailResponse,
  GetTeamListResponse,
  GetTeamMembersResponse,
  SearchMembersResponse,
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

//맴버 리스트 검색 (teamId : 팀 Id) -> 전체 멤버를 조회할 수 있도록 (nickname을 입력하지 않고도)
export const GetSearchMember = async (
  teamId: Id,
  nickname: Nickname
): Promise<ApiResponse<SearchMembersResponse>> => {
  return await backendApi.get(`v1/team/${teamId}/search-member`).json()
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
  return await backendApi.post(`v1/team/${teamId}/add`, { json: data }).json()
}

//팀원 모집 마감
export const CloseTeamRecruitment = async (
  teamId: Id
): Promise<ApiResponse> => {
  return await backendApi.patch(`v1/team/${teamId}/close`).json()
}

//팀원 모집글 삭제
export const DeleteTeamRecruitment = async (
  teamId: Id
): Promise<ApiResponse> => {
  return await backendApi.delete(`v1/team/${teamId}`).json()
}

//팀 멤버 삭제
export const DeleteTeamMember = async (
  teamId: Id,
  memberId: Id
): Promise<ApiResponse> => {
  return await backendApi.delete(`v1/team/${teamId}/members/${memberId}`).json()
}
