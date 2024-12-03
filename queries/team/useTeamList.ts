import { TeamListItem } from '@/types/api/team.types'
import { useQuery } from '@tanstack/react-query'

import { GetTeamRecruitmentList } from '@/services/team'

export const useTeamRecruitmentList = () => {
  return useQuery<TeamListItem[], Error>({
    queryKey: ['teamList'],
    queryFn: async () => {
      const data = await GetTeamRecruitmentList()
      return data.result as TeamListItem[]
    },
    staleTime: 1000 * 60 * 5,
  })
}


