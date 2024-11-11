import { fn } from '@storybook/test'

import { DeletableChip } from '@/components/common/chip'

export default {
  title: 'Common/Chip/DeletableChip',
  component: DeletableChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['common', 'chip', 'deletable'],
  argTypes: {
    label: {
      control: 'radio',
      options: [
        'Spring',
        'ReactNative',
        'MongoDB',
        'TypeScript',
        '프론트엔드',
        '풀스택',
        'DevOps 엔지니어',
      ],
      description: '문자열만 받습니다.',
    },
  },
  args: {
    onDelete: fn(),
  },
}

export const Default = {
  args: {
    label: '스터디',
  },
}

export const Gray = {
  args: {
    label: '기술',
    color: 'gray',
  },
}
