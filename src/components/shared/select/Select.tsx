'use client'

import { createContext, useContext, useState } from 'react'

import { IcCaretDown, IcCaretUp, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { Box } from '@/components/common/containers'
import { Dropdown, useDropdownContext } from '@/components/common/dropdown'
import { CheckboxInput, TextInput } from '@/components/common/input'

interface SelectContextType {
  options: Option[]
  selectedValues: string[] | null
  selectedValue: string | null
  searchTerm: string
  isMulti: boolean
  setSearchTerm: (value: string) => void
  toggleValue: (value: string) => void
  selectValue: (value: string) => void
  isSelected: (value: string) => boolean
  disabled: boolean
}

const SelectContext = createContext<SelectContextType | null>(null)

const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error(
      'useSelectContext는 Select 컴포넌트 없이 사용될 수 없습니다.'
    )
  }
  return context
}

interface SelectProps {
  options: Option[]
  selectedValues?: string[] | null
  selectedValue?: string | null
  isMulti?: boolean
  isSearchable?: boolean
  onMultiChange?: (values: string[]) => void
  onSingleChange?: (values: string) => void
  children: React.ReactNode
  disabled?: boolean
}

export const Select = ({
  options,
  selectedValues = null,
  selectedValue = null,
  isMulti = false,
  onMultiChange = () => {},
  onSingleChange = () => {},
  children,
  disabled = false,
}: SelectProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleValue = (value: string) => {
    if (selectedValues === null) return

    if (selectedValues.includes(value)) {
      onMultiChange(selectedValues.filter(v => v !== value))
    } else {
      onMultiChange([...selectedValues, value])
    }
  }

  const selectValue = (value: string) => {
    if (selectedValue === null) return

    onSingleChange(value)
  }

  const isSelected = (value: string) => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(value)
    } else {
      return selectedValue === value
    }
  }

  return (
    <SelectContext.Provider
      value={{
        options: filteredOptions,
        selectedValues,
        selectedValue,
        searchTerm,
        isMulti,
        setSearchTerm,
        toggleValue,
        selectValue,
        isSelected,
        disabled,
      }}
    >
      <Dropdown>{children}</Dropdown>
    </SelectContext.Provider>
  )
}

interface TriggerProps {
  placeholder?: string
  className?: string
  startIcon?: React.ReactElement
}

const Trigger = ({
  placeholder = 'Select an option',
  className,
  startIcon,
}: TriggerProps): JSX.Element => {
  const { isOpen } = useDropdownContext()

  const { selectedValues, selectedValue, isMulti, options, disabled } =
    useSelectContext()

  const getSelectedLabel = () => {
    if (isMulti) {
      if (selectedValues?.length) {
        return `${selectedValues[0]}${
          selectedValues.length > 1 ? ` 외 ${selectedValues.length - 1}개` : ''
        }`
      }
      return ''
    } else {
      return options.find(o => o.value === selectedValue)?.label || ''
    }
  }

  const triggerStyle = cn({
    'pointer-events-none cursor-not-allowed': disabled,
  })
  const isOptionSelected =
    (Array.isArray(selectedValues) && selectedValues.length) || selectedValue

  const triggerBoxClass = cn(
    'h-48 w-210 flex-row justify-between p-12 text-body1 font-medium text-gray-500 focus:border-primary-normal',
    { 'text-gray-800': isOptionSelected },
    { 'bg-gray-200 text-gray-400': disabled },
    className
  )

  return (
    <Dropdown.Trigger className={triggerStyle}>
      <Box className={triggerBoxClass} rounded={8}>
        <div className='flex items-center gap-1'>
          {startIcon}
          {getSelectedLabel() || placeholder}
        </div>
        {isOpen ? (
          <IcCaretUp width={24} height={24} />
        ) : (
          <IcCaretDown width={24} height={24} />
        )}
      </Box>
    </Dropdown.Trigger>
  )
}

const Menu = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return <Dropdown.Menu className={className}>{children}</Dropdown.Menu>
}

interface OptionProps extends Option {
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
}
const Option = ({
  value,
  label,
  startIcon,
  endIcon,
}: OptionProps): JSX.Element => {
  const { toggleValue, selectValue, isSelected, isMulti } = useSelectContext()

  const handleOptionClick = (value: string) => {
    if (isMulti) {
      toggleValue(value)
    } else {
      selectValue(value)
    }
  }

  return (
    <Dropdown.Item
      role='option'
      closeOnSelect={!isMulti}
      aria-selected={isSelected(value)}
      onClick={() => handleOptionClick(value)}
      className='flex items-center gap-4'
    >
      {isMulti && (
        <CheckboxInput
          checked={isSelected(value)}
          variant='checkbox'
          label=''
          readOnly
        />
      )}
      {startIcon}
      {label}
      {endIcon}
    </Dropdown.Item>
  )
}

const Search = ({ placeholder = '검색하기' }: { placeholder: string }) => {
  const { searchTerm, setSearchTerm } = useSelectContext()
  return (
    <TextInput
      type='text'
      startAdornment={
        <IcSearch width={24} height={24} className='relative bottom-2' />
      }
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      className='mb-8 h-40 outline-1 focus:outline-primary-normal'
    />
  )
}

Select.Trigger = Trigger
Select.Menu = Menu
Select.Option = Option
Select.Search = Search
