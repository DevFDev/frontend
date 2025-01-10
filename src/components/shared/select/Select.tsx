import { createContext, useContext, useState } from 'react'

import { IcCaretDown, IcCaretUp, IcSearch } from '@/assets/IconList'
import { cn } from '@/lib/utils'

import { Box } from '@/components/common/containers'
import { Dropdown, useDropdownContext } from '@/components/common/dropdown'
import { CheckboxInput, TextInput } from '@/components/common/input'

interface SelectContextType {
  options: Option[]
  selectedValues: Set<string>
  searchTerm: string
  isMulti: boolean
  setSearchTerm: (value: string) => void
  toggleValue: (value: string) => void
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
  isMulti?: boolean
  isSearchable?: boolean
  onChange: (values: string[]) => void
  children: React.ReactNode
  disabled?: boolean
}

export const Select = ({
  options,
  isMulti = false,
  onChange,
  children,
  disabled = false,
}: SelectProps): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleValue = (value: string) => {
    setSelectedValues(prev => {
      const newValues = new Set(prev)

      if (newValues.has(value)) {
        newValues.delete(value)
      } else {
        if (isMulti) {
          newValues.add(value)
        } else {
          return new Set([value])
        }
      }

      if (JSON.stringify([...newValues]) !== JSON.stringify([...prev])) {
        onChange([...newValues])
      }

      return newValues
    })
  }

  const isSelected = (value: string) => selectedValues.has(value)

  return (
    <SelectContext.Provider
      value={{
        options: filteredOptions,
        selectedValues,
        searchTerm,
        isMulti,
        setSearchTerm,
        toggleValue,
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
}

const Trigger = ({
  placeholder = 'Select an option',
  className,
}: TriggerProps): JSX.Element => {
  const { isOpen } = useDropdownContext()

  const { selectedValues, isMulti, options, disabled } = useSelectContext()
  const selectedLabel = isMulti
    ? selectedValues.size
      ? `${selectedValues.values().next().value}` +
        (selectedValues.size > 1 ? ` 외 ${selectedValues.size - 1}개` : '')
      : ''
    : options.find(o => o.value === selectedValues.values().next().value)
        ?.label || ''
  const triggerStyle = cn({
    'pointer-events-none cursor-not-allowed': disabled,
  })
  const triggerBoxClass = cn(
    'h-48 w-210 flex-row justify-between p-12 text-body1 font-medium text-gray-500 focus:border-primary-normal',
    { 'text-gray-800': selectedValues.size },
    { 'bg-gray-200 text-gray-400': disabled },
    className
  )

  return (
    <Dropdown.Trigger className={triggerStyle}>
      <Box className={triggerBoxClass} rounded={8}>
        {selectedLabel || placeholder}
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
  const { options } = useSelectContext()

  return (
    <Dropdown.Menu className={className}>
      {children}
      {options.map(option => (
        <Option key={option.value} value={option.value} label={option.label} />
      ))}
    </Dropdown.Menu>
  )
}

const Option = ({ value, label }: Option): JSX.Element => {
  const { toggleValue, isSelected, isMulti } = useSelectContext()

  return (
    <Dropdown.Item
      role='option'
      closeOnSelect={!isMulti}
      aria-selected={isSelected(value)}
      onClick={() => toggleValue(value)}
    >
      {isMulti && (
        <CheckboxInput
          checked={isSelected(value)}
          variant='checkbox'
          label=''
          readOnly
        />
      )}
      {label}
    </Dropdown.Item>
  )
}

const Search = () => {
  const { searchTerm, setSearchTerm } = useSelectContext()
  return (
    <TextInput
      type='text'
      startAdornment={
        <IcSearch width={24} height={24} className='relative bottom-2' />
      }
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder='Search...'
      className='mb-8 h-40 outline-1 focus:outline-primary-normal'
    />
  )
}

Select.Trigger = Trigger
Select.Menu = Menu
Select.Option = Option
Select.Search = Search
