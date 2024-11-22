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
  const selectedOption = options.find(option => option.value === value)
  const selectedLabel = selectedOption?.label || ''

  const handleSelect = (value: string) => {
    onChange(value)
  }

  const triggerStyle = clsx({
    'pointer-events-none cursor-not-allowed': disabled,
  })

  return (
    <Dropdown>
      <Dropdown.Trigger className={triggerStyle} aria-disabled={disabled}>
        <DropdownTriggerBox
          label={selectedLabel || placeholder}
          isSelected={!!selectedLabel}
          isDisabled={disabled}
        />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Item
            key={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

interface DropdownTriggerBoxProps {
  label: string
  isSelected: boolean
  isDisabled: boolean
}

const DropdownTriggerBox = ({
  label,
  isSelected,
  isDisabled,
}: DropdownTriggerBoxProps) => {
  const { isOpen } = useDropdownContext()
  const triggerBoxClass = clsx(
    'h-48 w-210 justify-between p-12 text-body1 font-medium text-gray-500 focus:border-primary-normal',
    { 'text-gray-800': isSelected },
    { 'bg-gray-200 text-gray-400': isDisabled }
  )

  return (
    <Box className={triggerBoxClass} rounded={8}>
      {label}
      {isOpen ? <IcCaretUp /> : <IcCaretDown />}
    </Box>
  )
}
