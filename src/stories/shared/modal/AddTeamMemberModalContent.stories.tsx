import type { Meta, StoryObj } from '@storybook/react'

import { AddTeamMemberModalContent } from '@/components/shared/modalContent/AddTeamMemberModalContent'

const meta: Meta<typeof AddTeamMemberModalContent> = {
  title: 'Components/Modal/AddTeamMemberModalContent',
  component: AddTeamMemberModalContent,
  parameters: {
    layout: 'centered', // 모달 중앙 배치
  },
}

export default meta
type Story = StoryObj<typeof AddTeamMemberModalContent>

export const Default: Story = {
  args: {},
}
