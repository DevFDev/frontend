import { fn } from '@storybook/test'

import { Chip } from '@/components/common/chip'

export default {
  title: 'Common/Chip/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['common', 'chip'],
  argTypes: {
    label: {
      control: 'radio',
      options: [
        '모집 중',
        '모집 완료',
        '스터디',
        '프로젝트',
        '멘토링',
        '기술',
        '커리어',
        '기타',
        '프론트엔드',
        '#Spring',
      ],
      description: '문자열만 받습니다.',
    },
  },
  args: {
    onClick: fn(),
  },
}

export const Default = {
  args: {
    label: '스터디',
  },
}
