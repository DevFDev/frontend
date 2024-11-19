import { fn } from '@storybook/test'

import { TextArea } from '@/components/common/textarea/TextArea'

export default {
  title: 'Common/TextArea/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: { control: 'text' },
    className: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
  },
  args: { onChange: fn() },
}

export const Small = {
  args: {
    placeholder: '댓글을 입력해보세요!',
    size: 'sm',
    fullWidth: true,
  },
}

export const Medium = {
  args: {
    placeholder: '주요 업무를 입력해주세요.',
    size: 'md',
    fullWidth: true,
  },
}
export const Large = {
  args: {
    placeholder: '간단한 소개글을 작성해주세요.',
    size: 'lg',
    fullWidth: true,
  },
}
