import { fn } from '@storybook/test'

import { TextInput } from '@/components/common/input/TextInput'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Common/Input/TextInput',
  component: TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['common', 'input'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    placeholder: '텍스트를 입력하세요.',
    primary: true
  },
}

export const Error = {
  args: {
    placeholder: '비밀번호를 입력하세요.',
    error: true
  },
}

export const FullWidth = {
  args: {
    placeholder: '텍스트를 입력하세요.',
    fullWidth: true
  },
}
