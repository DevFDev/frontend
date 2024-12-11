import { PortfolioListItem } from '@/types/api/Portfolio.types'
import { StoryObj } from '@storybook/react'

import { PortfolioCard } from '@/components/portfolio/PortfolioCard'

export default {
  title: 'Shared/Card/PortfolioCard',
  component: PortfolioCard,
}

const mockData: PortfolioListItem = {
  id: 1,
  portImageUrl: 'https://picsum.photos/250/250',
  portPosition: '프론트엔드',
  portTitle: '끊임없이 발전하는 개발자 홍길동',
  tags: [
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
    'tag',
  ],
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
    portfolioItem: mockData,
  },
}

export const CareerCategory: StoryObj = {
  args: {
    portfolioItem: {
      ...mockData,
      portPosition: '백엔드',
    },
  },
}
