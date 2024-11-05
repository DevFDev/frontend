import { fn } from '@storybook/test'

import { PasswordInput } from '@/components/common/input/PasswordInput'

export default {
  title: 'Example/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['input', 'password'],
  argTypes: {
    fullWidth: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
}

export const Default = {
  args: {
    // placeholder: '비밀번호를 입력하세요.',
  },
}

export const Error = {
  args: {
    error: true,
    // placeholder: '비밀번호가 올바르지 않습니다.',
  },
}

export const FullWidth = {
  args: {
    fullWidth: true,
    // placeholder: 'fullWidth 상태의 패스워드 인풋입니다.',
  },
}
