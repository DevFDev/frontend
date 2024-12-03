// }
'use client'

import { useEffect, useState } from 'react'

import { TeamListItem } from '@/types/api/team.types'
import { useTeamRecruitmentList } from 'queries/team/useTeamList'


// }

// }

// }

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
        {teamList?.map((team: TeamListItem) => (
          <li key={team.id}>
            <h2>{team.teamTitle}</h2>
            <p>{team.teamContent}</p>
            <h3>{team.teamIsActive}</h3>
            <h3>{team.member.nickname}</h3>
          </li>
        ))}
      </ul>
    </div>
  )
}
