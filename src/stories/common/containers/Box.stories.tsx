import { Meta, StoryObj } from '@storybook/react'

import { Box } from '@/components/common/containers'

const meta: Meta<typeof Box> = {
  title: 'Common/Containers/Box',
  component: Box,
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined'],
      description: 'Box variant type',
    },
    rounded: {
      control: 'radio',
      options: [8, 12],
      description: 'Box rounded corners',
    },
    padding: {
      control: 'select',
      options: [0, 10, 20, 30, 40],
      description: 'Padding inside the box',
    },
    margin: {
      control: 'select',
      options: [0, 10, 20, 30, 40],
      description: 'Margin outside the box',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Background color of the box',
    },
    className: {
      control: 'text',
      description: 'Custom additional classes',
    },
  },
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'This is a Box component',
    variant: 'outlined',
    rounded: 12,
    padding: 20,
    margin: 10,
    color: 'primary',
  },
}

export const ContainedBox: StoryObj = {
  args: {
    children: 'This is a contained Box component',
    variant: 'contained',
    rounded: 8,
    padding: 30,
    margin: 20,
    color: 'secondary',
  },
}

export const CustomizedBox: StoryObj = {
  args: {
    children: 'Customized Box with extra styles',
    variant: 'outlined',
    rounded: 12,
    padding: 40,
    margin: 10,
    color: 'tertiary',
    className: 'shadow-lg',
  },
}
