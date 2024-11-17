import { Logo } from '@/components/common/logo/'

export default {
  title: 'Common/Logo/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'secondary'],
      description: '로고의 스타일을 결정하는 옵션입니다.',
    },
  },
}

export const Default = {
  args: {
    variant: 'default',
  },
}

export const Primary = {
  args: {
    variant: 'primary',
  },
}

export const Secondary = {
  args: {
    variant: 'secondary',
  },
}
