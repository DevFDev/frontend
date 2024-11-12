import { Meta, StoryObj } from '@storybook/react'

import { Text } from '@/components/common/text'

export default {
  title: 'Common/Text/Caption',
  component: Text.Caption,
  argTypes: {
    variant: {
      control: 'select',
      options: ['caption1', 'caption2'],
    },
    as: {
      control: 'select',
      options: ['div', 'span'],
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
} as Meta<typeof Text.Caption>

type Story = StoryObj<typeof Text.Caption>

export const Default: Story = {
  args: {
    as: 'span',
    variant: 'caption1',
    color: 'gray600',
    weight: '400',
    children: 'This is a caption',
  },
}
