'use client'

import Image from 'next/image'

import { useState } from 'react'

import { IcCaretDown, IcCaretUp, IcCheck, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { Box } from '@/components/common/containers'
import { Dropdown, useDropdownContext } from '@/components/common/dropdown'
import { TextInput } from '@/components/common/input'
import { Text } from '@/components/common/text'

interface MemberSelectProps {
  members: MemberInfo[]
  selectedMembers: MemberInfo[]
  onSelect: (value: MemberInfo[]) => void
  placeholder?: string
  className?: string
}

const MemberSelectTrigger = ({
  searchTerm,
  setSearchTerm,
  placeholder,
}: {
  searchTerm: string
  setSearchTerm: (term: string) => void
  placeholder: string
}) => {
  const { isOpen, toggle } = useDropdownContext()

  return (
    <Dropdown.Trigger className='w-full'>
      <TextInput
        fullWidth
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value.trim())
          if (!isOpen) {
            toggle()
          }
        }}
        placeholder={placeholder}
        className={cn(
          'h-48 p-12 focus:border-gray-200 focus:outline-none',
          isOpen && 'rounded-b-0'
        )}
      />
    </Dropdown.Trigger>
  )
}

export const MemberSelect = ({
  members,
  selectedMembers,
  onSelect,
  placeholder = '멤버 선택',
}: MemberSelectProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredMembers = members
    .filter((member: MemberInfo) =>
      member.nickname.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .slice(0, 5)

  const toggleValue = (value: MemberInfo) => {
    if (selectedMembers === null) return

    if (selectedMembers.includes(value)) {
      onSelect(selectedMembers.filter(v => v !== value))
    } else {
      onSelect([...selectedMembers, value])
    }
  }

  return (
    <Dropdown>
      <MemberSelectTrigger
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={placeholder}
      />

      <Dropdown.Menu className='shadow-none static mt-0 w-full gap-8 rounded-t-0 border-x-1 border-b-1 border-solid border-gray-200 p-12'>
        {filteredMembers.map((member: MemberInfo) => {
          const isSelected = selectedMembers.find(
            selectedMember => selectedMember.id === member.id
          )
          const regex = searchTerm ? new RegExp(`(${searchTerm})`, 'gi') : null
          const parts = regex ? member.nickname.split(regex) : [member.nickname]
          return (
            <Dropdown.Item
              closeOnSelect={false}
              key={member.id}
              onClick={() => toggleValue(member)}
              className='flex h-48 w-full items-center gap-10 rounded-8 px-0 hover:bg-common-white hover:font-bold'
            >
              <Image
                src={member.imageUrl || '/default-profile.png'}
                alt='profile'
                width={24}
                height={24}
                className='rounded-full'
              />
              <Text.Body
                variant='body2'
                className={cn('text-gray-800', {
                  'font-bold text-primary-normal': isSelected,
                })}
              >
                {parts.map((part, index) =>
                  regex && regex.test(part) ? (
                    <span key={index} className='font-bold'>
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </Text.Body>
              <IcCheck
                className={cn('ml-auto', { 'text-primary-normal': isSelected })}
                width={24}
                height={24}
              />
            </Dropdown.Item>
          )
        })}
        {filteredMembers.length === 0 && (
          <Text.Body
            variant='body2'
            color='gray500'
            className='py-12 text-center'
          >
            검색 결과가 없습니다
          </Text.Body>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
