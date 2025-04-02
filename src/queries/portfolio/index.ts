import { useRouter } from 'next/navigation'

import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreatePortfolioRequest,
  CreatePortfolioResponse,
  GetPortfolioDetailResponse,
  GetPortfolioListQuery,
  GetportfolioListResponse,
} from '@/types/api/Portfolio.types'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createPortfolio,
  getPortfolio,
  getPortfolioList,
} from '@/services/portfolio'

// 프로잭트 게시글 목록 조회
export const usePortfolioList = (
  queries: GetPortfolioListQuery
): UseQueryResult<ApiResponse<GetportfolioListResponse>, Error> => {
  return useQuery({
    queryKey: [
      'portfolio',
      queries?.searchTerm || '',
      queries?.position || '',
      queries?.sortBy || '',
      queries?.page || 1,
    ],
    queryFn: async () => getPortfolioList(queries),
  })
}

// 커뮤니티 게시글 상세 조회
export const usePortfolio = (
  portfolioId: Id
): UseQueryResult<GetPortfolioDetailResponse, Error> => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['portfolio', portfolioId],
    queryFn: async () => {
      const { result } = await getPortfolio(portfolioId)
      return result
    },
    initialData: queryClient.getQueryData(['portfolio', portfolioId]),
  })
}

// // // 팀 멤버 목록 조회
// // export const useTeamMembers = (
// //   teamId: Id
// // ): UseQueryResult<GetTeamMembersResponse, Error> => {
// //   return useQuery({
// //     queryKey: ['teamMembers', teamId],
// //     queryFn: async () => {
// //       const { result } = await getTeamMembers(teamId)
// //       return result
// //     },
// //   })
// // }

// 커뮤니티 게시글 생성
export const useCreatePortfolio = (): UseMutationResult<
  ApiResponse<CreatePortfolioResponse>,
  Error,
  CreatePortfolioRequest
> => {
  const router = useRouter()
  return useMutation({
    mutationFn: createPortfolio,
    onSuccess: ({ result }) => {
      router.push(`/portfolio/${result.id}`)
    },
  })
}

// // 팀 모집글 수정
// export const useUpdatePortfolio = (
//   portfolioId: Id
// ): UseMutationResult<
//   ApiResponse<UpdatePortfolioResponse>,
//   Error,
//   UpdatePortfolioRequest
// > => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: data => updatePortfolio(portfolioId, data),
//     onSuccess: ({ result }) => {
//       queryClient.invalidateQueries({ queryKey: ['portfolio', portfolioId] })

//       router.push(`/portfolio/${result.id}`)
//     },
//   })
// }

// // 팀 모집글 삭제
// export const useDeletePortfolio = (
//   portfolioId: Id
// ): UseMutationResult<ApiResponse, Error, Id> => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: () => deletePortfolio(portfolioId),
//     onSuccess: () => {
//       router.push('/portfolio')
//       queryClient.invalidateQueries({ queryKey: ['portfolio'] })
//     },
//     onError: error => console.error(error),
//   })
// }

// // // 팀원 추가
// // export const useAddTeamMember = (
// //   teamId: Id
// // ): UseMutationResult<
// //   ApiResponse<AddTeamMemberResponse>,
// //   Error,
// //   AddTeamMemberRequest
// // > => {
// //   return useMutation({
// //     mutationFn: data => addTeamMember(teamId, data),
// //   })
// // }

// // // 팀원 삭제
// // export const useDeleteTeamMember = (
// //   teamId: Id
// // ): UseMutationResult<ApiResponse, Error, Id> => {
// //   return useMutation({
// //     mutationFn: memberId => deleteTeamMember(teamId, memberId),
// //   })
// // }

// // // 팀 모집 마감
// // export const useCloseTeamRecruitment = (
// //   teamId: Id
// // ): UseMutationResult<ApiResponse, Error, Id> => {
// //   const queryClient = useQueryClient()
// //   return useMutation({
// //     mutationFn: () => closeTeamRecruitment(teamId),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ['teamRecruitments', teamId] })
// //     },
// //   })
// // }

// // 인기 커뮤니티 TOP5 유저 조회
// export const usePortfolioTop5 = (): UseQueryResult<
//   ApiResponse<GetPortfolioTop5Response>,
//   Error
// > => {
//   return useQuery({
//     queryKey: ['portfolioTop5Response'],
//     queryFn: async () => getPortfolioTop5(),
//   })
// }
