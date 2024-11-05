import { fn } from '@storybook/test'

import { TextInput } from '@/components/common/input/TextInput'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TextInput',
  component: TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
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
    primary: true,
  },
}

export const Error = {
  args: {
    error: true,
  },
}

export const FullWidth = {
  args: {
    fullWidth: true,
  },
}
