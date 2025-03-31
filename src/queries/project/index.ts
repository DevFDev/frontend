import { useRouter } from 'next/navigation'

import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectDetailResponse,
  GetProjectListQuery,
  GetProjectListResponse,
  GetProjectTop5Response,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from '@/types/api/Project.types'
import {
  GetProjectListQuery,
  GetProjectListResponse,
} from '@/types/api/Project.types'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createProject,
  deleteProject,
  getProject,
  getProjectList,
  getProjectTop5,
  updateProject,
} from '@/services/project'


// 프로잭트 게시글 목록 조회
export const useProjectList = (
  queries: GetProjectListQuery
): UseQueryResult<ApiResponse<GetProjectListResponse>, Error> => {
  return useQuery({
    queryKey: [
      'project',
      queries?.searchTerm || '',
      queries?.projectCategory || '',
      queries?.sortBy || '',
      queries?.page || 1,
    ],
    queryFn: async () => getProjectList(queries),
  })
}

// 커뮤니티 게시글 상세 조회
export const useProject = (
  projectId: Id
): UseQueryResult<GetProjectDetailResponse, Error> => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { result } = await getProject(projectId)
      return result
    },
    initialData: queryClient.getQueryData(['project', projectId]),
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
export const useCreateProject = (): UseMutationResult<
  ApiResponse<CreateProjectResponse>,
  Error,
  CreateProjectRequest
> => {
  const router = useRouter()
  return useMutation({
    mutationFn: createProject,
    onSuccess: ({ result }) => {
      router.push(`/project/${result.id}`)
    },
  })
}

// // 팀 모집글 수정
// export const useUpdateProject = (
//   projectId: Id
// ): UseMutationResult<
//   ApiResponse<UpdateProjectResponse>,
//   Error,
//   UpdateProjectRequest
// > => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: data => updateProject(projectId, data),
//     onSuccess: ({ result }) => {
//       queryClient.invalidateQueries({ queryKey: ['project', projectId] })

//       router.push(`/project/${result.id}`)
//     },
//   })
// }

// // 팀 모집글 삭제
// export const useDeleteProject = (
//   projectId: Id
// ): UseMutationResult<ApiResponse, Error, Id> => {
//   const router = useRouter()
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: () => deleteProject(projectId),
//     onSuccess: () => {
//       router.push('/project')
//       queryClient.invalidateQueries({ queryKey: ['project'] })
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
// export const useProjectTop5 = (): UseQueryResult<
//   ApiResponse<GetProjectTop5Response>,
//   Error
// > => {
//   return useQuery({
//     queryKey: ['projectTop5Response'],
//     queryFn: async () => getProjectTop5(),
//   })
// }
