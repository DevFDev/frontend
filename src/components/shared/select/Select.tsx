import { useState } from 'react'

import { IcCaretDown, IcCaretUp } from '@/assets/IconList'
import clsx from 'clsx'

import { Box } from '@/components/common/containers'
import { Dropdown, useDropdownContext } from '@/components/common/dropdown'

type Options = {
  label: string
  value: string
}

interface SelectProps {
  options: Options[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}
export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}: SelectProps): JSX.Element => {
  const [selectedLabel, setSelectedLabel] = useState(
    options.find(option => option.value === value)?.label || ''
  )

  const handleSelect = (value: string, label: string) => {
    onChange(value)
    setSelectedLabel(label)
  }

  const triggerStyle = clsx({
    'pointer-events-none cursor-not-allowed': disabled,
  })

  return (
    <Dropdown>
      <Dropdown.Trigger className={triggerStyle} aria-disabled={disabled}>
        <DropdownTriggerBox
          selectedLabel={selectedLabel || placeholder}
          selected={!!selectedLabel}
          disabled={disabled}
        />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Item
            key={option.value}
            onClick={() => handleSelect(option.value, option.label)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const DropdownTriggerBox = ({
  selectedLabel,
  disabled,
  selected,
}: {
  selectedLabel: string
  disabled: boolean
  selected: boolean
}) => {
  const { isOpen } = useDropdownContext()
  const triggerBoxClass = clsx(
    'h-48 w-210 justify-between p-12 text-body1 font-medium text-gray-500 focus:border-primary-normal',
    { 'text-gray-800': selected },
    { 'bg-gray-200 text-gray-400': disabled }
  )

  return (
    <Box className={triggerBoxClass} rounded={8}>
      {selectedLabel}
      {isOpen ? <IcCaretUp /> : <IcCaretDown />}
    </Box>
  )
}
