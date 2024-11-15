import { Meta, StoryObj } from '@storybook/react'

import { Text } from '@/components/common/text'

export default {
  title: 'Common/Text/Body',
  component: Text.Body,
  argTypes: {
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'body3'],
    },
    as: {
      control: 'select',
      options: ['div', 'p'],
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
} as Meta<typeof Text.Body>

type Story = StoryObj<typeof Text.Body>

export const Default: Story = {
  args: {
    as: 'p',
    variant: 'body1',
    color: 'gray800',
    weight: '500',
    children: 'This is body text',
  },
}
