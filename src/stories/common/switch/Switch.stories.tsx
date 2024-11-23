import { useState } from 'react'

import { Meta, StoryFn } from '@storybook/react'

import { Switch } from '@/components/common/switch/Switch'

export default {
  title: 'Common/Switch/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    isOn: { control: 'boolean', table: { disable: true } },
    disabled: { control: 'boolean' },
  },
} as Meta

const Template: StoryFn = args => {
  const [isOn, setIsOn] = useState<boolean>(args.isOn || false)

  const toggleSwitch = () => setIsOn((prev: boolean) => !prev)

  return <Switch {...args} isOn={isOn} onToggle={toggleSwitch} />
}

export const Default = Template.bind({})
Default.args = {
  isOn: false,
  label: '모집 중만 보기',
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  isOn: false,
  label: '모집 중만 보기',
  disabled: true,
}
