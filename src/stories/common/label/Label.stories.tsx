import { Meta, StoryObj } from '@storybook/react'

import { TextInput } from '@/components/common/input/TextInput'
import { Label, LabelProps } from '@/components/common/label/Label'

const meta: Meta<typeof Label> = {
  title: 'Common/Label/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  args: {
    required: false,
    labelText: '라벨 제목',
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    labelText: '이름',
    required: false,
  },
  render: (args: LabelProps) => (
    <Label {...args}>
      <TextInput placeholder='이름을 입력하세요' />
    </Label>
  ),
}

export const RequiredLabel: Story = {
  args: {
    labelText: '이메일',
    required: true,
  },
  render: (args: LabelProps) => (
    <Label {...args}>
      <TextInput placeholder='이메일을 입력하세요' />
    </Label>
  ),
}
