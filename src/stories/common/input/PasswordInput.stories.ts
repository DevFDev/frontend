import { fn } from '@storybook/test'

import { PasswordInput } from '@/components/common/input/PasswordInput'

export default {
  title: 'Common/Input/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['input', 'password'],
  argTypes: {
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
}

export const Default = {
  args: {
    placeholder: '비밀번호를 입력하세요.',
  },
}

export const Error = {
  args: {
    error: true,
  },
}

export const FullWidth = {
  args: {
    placeholder: '비밀번호를 입력하세요.',
    fullWidth: true,
  },
}
