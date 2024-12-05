'use client'

import { TeamRecruitmentListItem } from '@/types/api/Team.types'
import { useTeamRecruitmentList } from 'queries/team/useTeamList'

export default function Page(): JSX.Element {
  const { data: teamList, isLoading, error } = useTeamRecruitmentList()
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <ul>
        {teamList?.map((team: TeamRecruitmentListItem) => (
          <li key={team.id}>
            <h2>{team.teamTitle}</h2>
            <h3>{team.teamIsActive}</h3>
            <p>{team.teamContent}</p>
            <h5>{team.member.nickname}</h5>
          </li>
        ))}
      </ul>
    </div>
  )
}
