import { useRouter } from 'next/router'

import { ApiResponse } from '@/types/api/ApiResponse.types'
import {
  CreateTeamRecruitmentResponse,
  TeamRecruitmentBase,
  TeamRecruitmentListItem,
} from '@/types/api/Team.types'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import {
  CreateTeamRecruitment,
  GetTeamRecruitment,
  GetTeamRecruitmentList,
} from '@/services/team'

export const useTeamRecruitmentList = (): UseQueryResult<
  TeamRecruitmentListItem[],
  Error
> => {
  const query = useQuery<TeamRecruitmentListItem[], Error>({
    queryKey: ['teamList'],
    queryFn: async () => {
      const data = await GetTeamRecruitmentList()
      return data.result as TeamRecruitmentListItem[]
    },
    staleTime: 1000 * 60 * 5,
  })
  return query
}

export const useGetTeamRecruitmentMutation = (): UseMutationResult<
  ApiResponse<CreateTeamRecruitmentResponse>,
  unknown,
  TeamRecruitmentBase,
  unknown
> => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: CreateTeamRecruitment,
    onSuccess: ({ result }) => {
      const { id } = result
      router.push(`/team/${id}`)
    },
    onError: (error: unknown) => {
      console.error('Logout Error:', error)
      alert('로그아웃 요청 중 오류가 발생했습니다')
    },
  })

  return mutation
}
