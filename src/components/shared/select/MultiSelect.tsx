import { IcCaretDown, IcCaretUp } from '@/assets/IconList'
import clsx from 'clsx'

import { Box } from '@/components/common/containers'
import { Dropdown, useDropdownContext } from '@/components/common/dropdown'
import { CheckboxInput } from '@/components/common/input'

type Option = {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  values: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  placeholder?: string
  disabled?: boolean
}
export const MultiSelect = ({
  options,
  values,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}: SelectProps): JSX.Element => {
  const selectedOptions = options.filter(option =>
    values.includes(option.value)
  )
  const selectedLabel = selectedOptions[0]?.value
    ? `${selectedOptions[0]?.value}` +
      (selectedOptions.length - 1
        ? ` 외 ${selectedOptions.length - 1}개 선택`
        : '')
    : ''

  const handleSelect = (value: string) => {
    onChange(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
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
            closeOnSelect={false}
            onClick={() => handleSelect(option.value)}
          >
            <CheckboxInput
              label={option.label}
              onClick={() => handleSelect(option.value)}
              variant='checkbox'
              checked={selectedOptions.some(
                selectedOption => selectedOption.value === option.value
              )}
              className='ml-4 cursor-pointer'
            />
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
