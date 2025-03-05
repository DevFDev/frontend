import { useRouter } from 'next/navigation'

import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreateCommunityRequest,
  CreateCommunityResponse,
  GetCommunityListQuery,
  GetCommunityListResponse,
} from '@/types/api/Community.types'
import {
  AddTeamMemberRequest,
  AddTeamMemberResponse,
  CreateTeamRecruitmentRequest,
  CreateTeamRecruitmentResponse,
  GetTeamMembersResponse,
  GetTeamRecruitmentListQuery,
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
  useQueryClient,
} from '@tanstack/react-query'

import { createCommunity, getCommunityList } from '@/services/community'

// 커뮤니티 게시글 목록 조회
export const useCommunityRecruitmentList = (
  queries: GetCommunityListQuery
): UseQueryResult<ApiResponse<GetCommunityListResponse>, Error> => {
  return useQuery({
    queryKey: [
      'community',
      queries?.searchTerm || '',
      queries?.category || '',
      queries?.sortBy || '',
    ],
    queryFn: async () => getCommunityList(queries),
  })
}

// // 팀 모집글 상세 조회
// export const useTeamRecruitment = (
//   teamId: Id
// ): UseQueryResult<GetTeamRecruitmentResponse, Error> => {
//   const queryClient = useQueryClient()
//   return useQuery({
//     queryKey: ['teamRecruitment', teamId],
//     queryFn: async () => {
//       const { result } = await getTeamRecruitment(teamId)
//       return result
//     },
//     initialData: queryClient.getQueryData(['teamRecruitment', teamId]),
//   })
// }

// // 팀 멤버 목록 조회
// export const useTeamMembers = (
//   teamId: Id
// ): UseQueryResult<GetTeamMembersResponse, Error> => {
//   return useQuery({
//     queryKey: ['teamMembers', teamId],
//     queryFn: async () => {
//       const { result } = await getTeamMembers(teamId)
//       return result
//     },
//   })
// }

// 커뮤니티 게시글 생성
export const useCreateCommunity = (): UseMutationResult<
  ApiResponse<CreateCommunityResponse>,
  Error,
  CreateCommunityRequest
> => {
  const router = useRouter()
  return useMutation({
    mutationFn: createCommunity,
    onSuccess: ({ result }) => {
      router.push(`/community/${result.id}`)
    },
  })
}

// // 팀 모집글 수정
// export const useUpdateTeamRecruitment = (
//   teamId: Id
// ): UseMutationResult<
//   ApiResponse<UpdateTeamRecruitmentResponse>,
//   Error,
//   UpdateTeamRecruitmentRequest
// > => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: data => updateTeamRecruitment(teamId, data),
//     onSuccess: ({ result }) => {
//       queryClient.invalidateQueries({ queryKey: ['teamRecruitments', teamId] })

//       router.push(`/team/${result.id}`)
//     },
//   })
// }

// // 팀원 추가
// export const useAddTeamMember = (
//   teamId: Id
// ): UseMutationResult<
//   ApiResponse<AddTeamMemberResponse>,
//   Error,
//   AddTeamMemberRequest
// > => {
//   return useMutation({
//     mutationFn: data => addTeamMember(teamId, data),
//   })
// }

// // 팀원 삭제
// export const useDeleteTeamMember = (
//   teamId: Id
// ): UseMutationResult<ApiResponse, Error, Id> => {
//   return useMutation({
//     mutationFn: memberId => deleteTeamMember(teamId, memberId),
//   })
// }

// // 팀 모집글 삭제
// export const useDeleteTeamRecruitment = (
//   teamId: Id
// ): UseMutationResult<ApiResponse, Error, Id> => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: () => deleteTeamRecruitment(teamId),
//     onSuccess: () => {
//       router.push('/team')
//       queryClient.invalidateQueries({ queryKey: ['teamRecruitments'] })
//     },
//     onError: error => console.error(error),
//   })
// }

// // 팀 모집 마감
// export const useCloseTeamRecruitment = (
//   teamId: Id
// ): UseMutationResult<ApiResponse, Error, Id> => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: () => closeTeamRecruitment(teamId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['teamRecruitments', teamId] })
//     },
//   })
// }

// // 멤버 검색
// export const useSearchMembers = (
//   teamId: Id,
//   nickname?: string
// ): UseQueryResult<SearchMembersResponse, Error> => {
//   return useQuery({
//     queryKey: ['teamMembers', teamId, 'search', nickname],
//     queryFn: async () => {
//       const { result } = await searchMembers(teamId, nickname)
//       return result
//     },
//     enabled: !!teamId, // teamId가 있을 때만 쿼리 실행
//   })
// }
