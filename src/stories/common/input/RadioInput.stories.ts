import { fn } from '@storybook/test'

import { RadioInput } from '@/components/common/input/RadioInput'

export default {
  title: 'Common/Input/RadioInput',
  component: RadioInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['common', 'radio'],
  args: {
    onChange: fn(),
  },
}

export const Default = {
  args: {
    label: '회사 ‧ 학교',
  },
}
