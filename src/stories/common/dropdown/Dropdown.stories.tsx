import { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from '@/components/common/dropdown'

export default {
  title: 'Common/Dropdown/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Default: StoryObj = {
  render: () => (
    <Dropdown className='w-64'>
      <Dropdown.Trigger className='w-full rounded-md bg-gray-200 px-4 py-2'>
        Select an option
      </Dropdown.Trigger>
      <Dropdown.Menu position='dropdown' alignment='left'>
        <Dropdown.Item value='option1'>Option 1</Dropdown.Item>
        <Dropdown.Item value='option2'>Option 2</Dropdown.Item>
        <Dropdown.Item value='option3' closeOnSelect={false}>
          Option 3 (Persistent)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
}

export const Dropup: StoryObj = {
  render: () => (
    <Dropdown className='w-64'>
      <Dropdown.Trigger className='w-full rounded-md bg-gray-200 px-4 py-2'>
        Select an option
      </Dropdown.Trigger>
      <Dropdown.Menu position='dropup' alignment='right'>
        <Dropdown.Item value='option1'>Option 1</Dropdown.Item>
        <Dropdown.Item value='option2'>Option 2</Dropdown.Item>
        <Dropdown.Item value='option3' closeOnSelect={false}>
          Option 3 (Persistent)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
}
