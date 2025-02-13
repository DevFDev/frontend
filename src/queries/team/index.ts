import { useRouter } from 'next/navigation'

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
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import {
  addTeamMember,
  closeTeamRecruitment,
  createTeamRecruitment,
  deleteTeamMember,
  deleteTeamRecruitment,
  getTeamMembers,
  getTeamRecruitment,
  getTeamRecruitmentList,
  searchMembers,
  updateTeamRecruitment,
} from '@/services/team'

// 팀 모집글 목록 조회
export const useTeamRecruitmentList = (): UseQueryResult<
  GetTeamRecruitmentListResponse,
  Error
> => {
  return useQuery({
    queryKey: ['teamRecruitments'],
    queryFn: async () => {
      const { result } = await getTeamRecruitmentList()
      return result
    },
  })
}

// 팀 모집글 상세 조회
export const useTeamRecruitment = (
  teamId: Id
): UseQueryResult<GetTeamRecruitmentResponse, Error> => {
  return useQuery({
    queryKey: ['teamRecruitment', teamId],
    queryFn: async () => {
      const { result } = await getTeamRecruitment(teamId)
      return result
    },
  })
}

// 팀 멤버 목록 조회
export const useTeamMembers = (
  teamId: Id
): UseQueryResult<GetTeamMembersResponse, Error> => {
  return useQuery({
    queryKey: ['teamMembers', teamId],
    queryFn: async () => {
      const { result } = await getTeamMembers(teamId)
      return result
    },
  })
}

// 팀 모집글 생성
export const useCreateTeamRecruitment = (): UseMutationResult<
  ApiResponse<CreateTeamRecruitmentResponse>,
  Error,
  CreateTeamRecruitmentRequest
> => {
  const router = useRouter()
  return useMutation({
    mutationFn: createTeamRecruitment,
    onSuccess: ({ result }) => {
      router.push(`/team/${result.id}`)
    },
  })
}

// 팀 모집글 수정
export const useUpdateTeamRecruitment = (
  teamId: Id
): UseMutationResult<
  ApiResponse<UpdateTeamRecruitmentResponse>,
  Error,
  UpdateTeamRecruitmentRequest
> => {
  return useMutation({
    mutationFn: data => updateTeamRecruitment(teamId, data),
  })
}

// 팀원 추가
export const useAddTeamMember = (
  teamId: Id
): UseMutationResult<
  ApiResponse<AddTeamMemberResponse>,
  Error,
  AddTeamMemberRequest
> => {
  return useMutation({
    mutationFn: data => addTeamMember(teamId, data),
  })
}

// 팀원 삭제
export const useDeleteTeamMember = (
  teamId: Id
): UseMutationResult<ApiResponse, Error, Id> => {
  return useMutation({
    mutationFn: memberId => deleteTeamMember(teamId, memberId),
  })
}

// 팀 모집글 삭제
export const useDeleteTeamRecruitment = (): UseMutationResult<
  ApiResponse,
  Error,
  Id
> => {
  const router = useRouter()
  return useMutation({
    mutationFn: deleteTeamRecruitment,
    onSuccess: () => {
      router.push('/team')
    },
  })
}

// 팀 모집 마감
export const useCloseTeamRecruitment = (): UseMutationResult<
  ApiResponse,
  Error,
  Id
> => {
  return useMutation({
    mutationFn: closeTeamRecruitment,
  })
}

// 멤버 검색
export const useSearchMembers = (
  teamId: Id,
  nickname?: string
): UseQueryResult<SearchMembersResponse, Error> => {
  return useQuery({
    queryKey: ['teamMembers', teamId, 'search', nickname],
    queryFn: async () => {
      const { result } = await searchMembers(teamId, nickname)
      return result
    },
    enabled: !!teamId, // teamId가 있을 때만 쿼리 실행
  })
}
