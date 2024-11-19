import { useArgs } from '@storybook/preview-api'
import { Meta, StoryFn } from '@storybook/react'

import { TextArea, TextAreaProps } from '@/components/common/textarea/TextArea'

export default {
  title: 'Common/TextArea/TextArea',
  component: TextArea,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    className: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
  },
} as Meta

const Template: StoryFn<TextAreaProps> = (args: TextAreaProps) => {
  const [{ value }, updateArgs] = useArgs()

  return (
    <div className='flex w-1200 justify-center p-30'>
      <TextArea
        {...args}
        value={value}
        onChange={e => updateArgs({ value: e.target.value })}
      />
    </div>
  )
}

export const Small = Template.bind({})
Small.args = {
  value: '',
  placeholder: '댓글을 입력해보세요!',
  size: 'sm',
  fullWidth: true,
}

export const Medium = Template.bind({})
Medium.args = {
  value: '',
  placeholder: '주요 업무를 입력해주세요.',
  size: 'md',
  fullWidth: true,
}

export const Large = Template.bind({})
Large.args = {
  value: '',
  placeholder: '간단한 소개글을 작성해보세요!',
  size: 'lg',
  fullWidth: true,
}
