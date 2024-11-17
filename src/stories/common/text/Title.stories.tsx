import { Meta, StoryObj } from '@storybook/react'

import { Text } from '@/components/common/text'

export default {
  title: 'Common/Text/Title',
  component: Text.Title,
  argTypes: {
    variant: {
      control: 'select',
      options: ['title1', 'title2'],
    },
    as: {
      control: 'select',
      options: ['h4', 'h5', 'div', 'p'],
    },
    color: {
      control: 'select',
      options: [
        'gray500',
        'gray600',
        'gray700',
        'gray800',
        'highlight',
        'positive',
        'negative',
        'caution',
        'active',
      ],
    },
    weight: {
      control: 'select',
      options: ['400', '500', '600', '700'],
    },
  },
} as Meta<typeof Text.Title>

type Story = StoryObj<typeof Text.Title>

export const Default: Story = {
  args: {
    as: 'h4',
    variant: 'title1',
    color: 'gray800',
    weight: '700',
    children: 'This is a Title',
  },
}
