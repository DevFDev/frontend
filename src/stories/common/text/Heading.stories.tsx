import { Meta, StoryObj } from '@storybook/react'

import { Text } from '@/components/common/text'

export default {
  title: 'Common/Text/Heading',
  component: Text.Heading,
  argTypes: {
    variant: {
      control: 'select',
      options: ['heading1', 'heading2', 'heading3', 'heading4', 'heading5'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5'],
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
} as Meta<typeof Text.Heading>

type Story = StoryObj<typeof Text.Heading>

export const Default: Story = {
  args: {
    as: 'h1',
    variant: 'heading1',
    color: 'gray800',
    weight: '700',
    children: 'This is a Heading',
  },
}
