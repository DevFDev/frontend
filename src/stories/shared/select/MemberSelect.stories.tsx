import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { MemberSelect } from '@/components/shared/select/MemberSelect'

const meta = {
  title: 'Components/Shared/Select/MemberSelect',
  component: MemberSelect,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className='p-24'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MemberSelect>

export default meta
type Story = StoryObj<typeof meta>

const mockMembers = [
  {
    id: 1,
    nickname: '망곰이',
    imageUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  },
  {
    id: 2,
    nickname: '망곰쓰',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 3,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 4,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 5,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 6,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
]

export const Default: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<MemberInfo[]>([])
    const handleSelect = (value: MemberInfo[]) => {
      setSelectedMembers(value)
    }
    return (
      <MemberSelect
        members={mockMembers}
        selectedMembers={selectedMembers}
        onSelect={handleSelect}
        placeholder='멤버 선택'
      />
    )
  },
}

export const WithSelectedMember: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(
      mockMembers[0]
    )

    return (
      <MemberSelect
        members={mockMembers}
        selectedMember={selectedMember}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelect={setSelectedMember}
        placeholder='멤버 선택'
      />
    )
  },
}

export const EmptyResults: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(
      null
    )

    return (
      <MemberSelect
        members={[]}
        selectedMember={selectedMember}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelect={setSelectedMember}
        placeholder='멤버 선택'
      />
    )
  },
}

export const WithSearchTerm: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('망곰')
    const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(
      null
    )

    const filteredMembers = mockMembers.filter(member =>
      member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <MemberSelect
        members={filteredMembers}
        selectedMember={selectedMember}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelect={setSelectedMember}
        placeholder='멤버 선택'
      />
    )
  },
}
