import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '@/components/common/avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [24, 48, 60, 180],
      description: 'Avatar size in pixels',
    },
    image: {
      control: 'text',
      description: 'URL of the avatar image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
  args: {
    alt: 'User Avatar',
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    size: 48,
    image: null,
  },
}

export const WithImage: Story = {
  args: {
    size: 48,
    image: 'https://picsum.photos/250/250',
  },
}

export const LargeAvatar: Story = {
  args: {
    size: 180,
    image: 'https://picsum.photos/250/250',
  },
}

export const SmallAvatar: Story = {
  args: {
    size: 24,
    image: null,
  },
}
