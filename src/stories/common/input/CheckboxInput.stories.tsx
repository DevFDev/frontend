import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { CheckboxInput } from '@/components/common/input/CheckboxInput'

const meta: Meta<typeof CheckboxInput> = {
  component: CheckboxInput,
  title: 'Common/Input/CheckboxInput',
  args: {
    label: '전체 동의',
    variant: 'checkbox',
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof CheckboxInput>

export const Default: Story = {
  args: {
    label: '전체 동의',
    variant: 'checkbox',
    checked: false,
    disabled: false,
  },
  render: function Render(args: any) {
    const [checked, setChecked] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
    }

    return <CheckboxInput {...args} checked={checked} onChange={handleChange} />
  },
}

export const Check: Story = {
  args: {
    label: '이메일 수신 동의',
    variant: 'check',
    checked: false,
    disabled: false,
  },
  render: function Render(args: any) {
    const [checked, setChecked] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked)
    }

    return <CheckboxInput {...args} checked={checked} onChange={handleChange} />
  },
}

export const DisabledCheckbox: Story = {
  args: {
    label: '비활성화된 체크박스',
    variant: 'checkbox',
    checked: false,
    disabled: true,
  },
  render: function Render(args: any) {
    return <CheckboxInput {...args} />
  },
}

export const DisabledCheck: Story = {
  args: {
    label: '비활성화된 체크',
    variant: 'check',
    checked: false,
    disabled: true,
  },
  render: function Render(args: any) {
    return <CheckboxInput {...args} />
  },
}
