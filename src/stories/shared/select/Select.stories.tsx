import React, { useState } from 'react'

import { Meta, StoryFn } from '@storybook/react'

import { Select } from '@/components/shared/select'

export default {
  title: 'Components/Common/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} as Meta

const Template: StoryFn<typeof Select> = args => {
  const [value, setValue] = useState(args.value)
  return <Select {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: '스터디', value: '스터디' },
    { label: '팀 프로젝트', value: '팀 프로젝트' },
    { label: '멘토링', value: '멘토링' },
  ],
  value: '',
  placeholder: '모집 유형 선택',
  disabled: false,
}

export const WithPreSelectedValue = Template.bind({})
WithPreSelectedValue.args = {
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
  value: 'option2',
  placeholder: 'Select an option',
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
  value: '',
  placeholder: 'Select an option',
  disabled: true,
}
