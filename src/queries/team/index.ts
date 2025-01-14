import { TeamRecruitmentListItem } from '@/types/api/Team.types'
import { useQuery } from '@tanstack/react-query'

import { GetTeamRecruitmentList } from '@/services/team'

export const useTeamRecruitmentList = () => {
  return useQuery<TeamRecruitmentListItem[], Error>({
    queryKey: ['teamList'],
    queryFn: async () => {
      const data = await GetTeamRecruitmentList()
      return data.result as TeamRecruitmentListItem[]
    },
    staleTime: 1000 * 60 * 5,
  })
}
