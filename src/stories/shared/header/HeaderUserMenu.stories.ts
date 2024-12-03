import { Meta, StoryObj } from '@storybook/react'

import { HeaderUserMenu } from '@/components/shared/header'

export default {
  title: 'Shared/Header/HeaderUserMenu',
  component: HeaderUserMenu,
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Default: StoryObj = {
  args: {
    user: {
      id: '1',
      name: 'John Doe',
      imageUrl: 'https://picsum.photos/250/250',
    },
  },
}
export const WithLongName: StoryObj = {
  args: {
    user: {
      id: '2',
      name: 'Alexander the Great',
      imageUrl: 'https://picsum.photos/250/250',
    },
  },
}
export const WithoutImage: StoryObj = {
  args: {
    user: {
      id: '3',
      name: 'Jane Doe',
      imageUrl: '',
    },
  },
}
