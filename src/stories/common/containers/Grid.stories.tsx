import { Meta, StoryObj } from '@storybook/react'

import { Grid } from '@/components/common/containers'

export default {
  title: 'Common/Containers/Grid',
  component: Grid.Container,
  subcomponents: { GridItem: Grid.Item },
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Default: StoryObj = {
  render: () => (
    <Grid.Container columns={3} spacing={16}>
      <Grid.Item>Item 1</Grid.Item>
      <Grid.Item>Item 2</Grid.Item>
      <Grid.Item>Item 3</Grid.Item>
      <Grid.Item>Item 4</Grid.Item>
    </Grid.Container>
  ),
}

export const CustomSpacing: StoryObj = {
  render: () => (
    <Grid.Container columns={3} spacing={8} rowGap={12}>
      <Grid.Item colSpan={1}>Item 1</Grid.Item>
      <Grid.Item colSpan={2}>Item 2</Grid.Item>
      <Grid.Item colSpan={2}>Item 3</Grid.Item>
      <Grid.Item colSpan={1}>Item 4</Grid.Item>
      <Grid.Item colSpan={4}>Item 5</Grid.Item>
    </Grid.Container>
  ),
}

export const CustomClasses: StoryObj = {
  render: () => (
    <Grid.Container columns={2} spacing={16} className='custom-container'>
      <Grid.Item colSpan={1} className='custom-item'>
        Custom Styled Item
      </Grid.Item>
      <Grid.Item colSpan={1} className='custom-item'>
        Custom Styled Item
      </Grid.Item>
    </Grid.Container>
  ),
}
