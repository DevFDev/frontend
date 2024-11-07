import { fn } from '@storybook/test'

import { Clickable } from '@/components/common/button/Clickable'

export default {
  title: 'Common/Button/Clickable',
  component: Clickable,
  parameters: {
    layout: 'centered',
  },
  tags: ['common', 'button'],
  argTypes: {
    label: { control: 'text', description: '문자열만 받습니다.' },
    variant: {
      control: 'radio',
      options: ['contained', 'outlined', 'text'],
      description: '디폴트로 contained',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '순서대로 height 40 44 48 52',
    },
    borderColor: {
      control: 'radio',
      options: ['gray', 'blue'],
      description: 'outlined 일 때만 적용',
    },
    backgroundColor: {
      control: 'radio',
      options: ['gray', 'blue', 'white', 'transparentBlue'],
      description: 'variant 로 스타일 안되는 경우 추가',
    },
    textColor: {
      control: 'radio',
      options: ['black', 'blue', 'white', 'gray400', 'gray500', 'gray600'],
      description: 'variant 로 스타일 안되는 경우 추가',
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
}

export const Default = {
  args: {
    label: '기본 버튼',
  },
}
