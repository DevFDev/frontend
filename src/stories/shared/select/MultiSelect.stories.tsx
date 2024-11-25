import { useState } from 'react'

import { Meta, StoryFn } from '@storybook/react'

import { MultiSelect } from '@/components/shared/select'

export default {
  title: 'Shared/Select/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
} as Meta

const Template: StoryFn<typeof MultiSelect> = args => {
  const [values, setValues] = useState<string[]>(args.values || [])
  return <MultiSelect {...args} values={values} onChange={setValues} />
}

export const Default = Template.bind({})
Default.args = {
  options: [
    { label: '백엔드', value: '백엔드' },
    { label: '프론트엔드', value: '프론트엔드' },
    { label: '모바일', value: '모바일' },
    { label: '기타', value: '기타' },
  ],
  values: [],
  placeholder: '포지션',
  disabled: false,
}

export const WithPreSelectedValue = Template.bind({})
WithPreSelectedValue.args = {
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
  values: ['option2'],
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
  values: [],
  placeholder: 'Select an option',
  disabled: true,
}

export const MultiSelected = Template.bind({})
MultiSelected.args = {
  options: [
    { label: '스터디', value: '스터디' },
    { label: '팀 프로젝트', value: '팀 프로젝트' },
    { label: '멘토링', value: '멘토링' },
  ],
  values: ['스터디', '팀 프로젝트'],
  placeholder: '모집 유형 선택',
  disabled: false,
}

export const NoOptionsAvailable = Template.bind({})
NoOptionsAvailable.args = {
  options: [],
  values: [],
  placeholder: '선택할 옵션이 없습니다',
  disabled: false,
}
