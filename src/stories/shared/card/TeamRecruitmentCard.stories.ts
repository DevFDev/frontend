import { TeamRecruitmentListItem } from '@/types/api/Team.types'
import { Meta, StoryObj } from '@storybook/react'

import { TeamRecruitmentCard } from '@/components/team/TeamRecruitmentCard'

export default {
  title: 'Shared/Card/TeamRecruitmentCard',
  component: TeamRecruitmentCard,
}

const mockData: TeamRecruitmentListItem = {
  teamIsActive: true,
  teamTitle: 'Frontend Developer 모집',
  teamPosition: '프론트엔드',
  teamRecruitmentNum: 3,
  teamTechStack: ['React', 'TypeScript', 'Tailwind'],
  writer: {
    id: 1,
    nickname: 'John Doe',
    imageUrl: 'https://picsum.photos/250/250',
  },
  answers: 5,
  likes: 10,
  createdAt: '2023-12-01T12:00:00Z',
}

export const Default: StoryObj = {
  args: {
    teamRecruitmentItem: mockData,
  },
}

export const InactiveRecruitment: StoryObj = {
  args: {
    teamRecruitmentItem: {
      ...mockData,
      teamIsActive: false,
      teamTitle: 'Backend Developer 모집',
      teamPosition: '백엔드',
    },
  },
}

export const NoTechStack: StoryObj = {
  args: {
    teamRecruitmentItem: {
      ...mockData,
      teamTechStack: [],
    },
  },
}

export const TooManyStack: StoryObj = {
  args: {
    teamRecruitmentItem: {
      ...mockData,
      teamTechStack: [
        'React',
        'TypeScript',
        'Tailwind',
        'Node.js',
        'GraphQL',
        'React',
        'TypeScript',
        'Tailwind',
        'Node.js',
        'GraphQL',
      ],
    },
  },
}
