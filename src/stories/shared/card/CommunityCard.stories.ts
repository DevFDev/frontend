import { CommunityListItem } from '@/types/api/Community.types'
import { StoryObj } from '@storybook/react'

import { CommunityCard } from '@/components/community/CommunityCard'

export default {
  title: 'Shared/Card/CommunityCard',
  component: CommunityCard,
}

const mockData: CommunityListItem = {
  id: 1,
  communityCategory: 'SKILL',
  communityTitle: '백엔드 5년차 이직 고민',
  communityContent:
    'DFD에 커뮤니티 기능이 있어서 글 써봅니다. 현재 중소기업에서 5년차 백엔드 개발자로 일하고 있습니다. 어느 순간부터 이 직군과 맞지 않는다고 생각 중인데 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
  writer: {
    id: 1,
    nickname: 'John Doe',
    imageUrl: 'https://picsum.photos/250/250',
  },
  answers: 5,
  likes: 10,
  views: 10,
  createdAt: '2023-12-01T12:00:00Z',
}

export const Default: StoryObj = {
  args: {
    communityItem: mockData,
  },
}

export const CareerCategory: StoryObj = {
  args: {
    communityItem: {
      ...mockData,
      communityCategory: 'CAREER',
      communityTitle: '백엔드 5년차 이직 고민',
    },
  },
}
export const OtherCategory: StoryObj = {
  args: {
    communityItem: {
      ...mockData,
      communityCategory: 'OTHER',
      communityTitle: '백엔드 5년차 이직 고민',
    },
  },
}
