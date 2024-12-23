import { createContext, useContext, useState } from 'react'

import { cn } from '@/lib/cn'

import { Box } from '@/components/common/containers'
import { Dropdown } from '@/components/common/dropdown'
import { TextInput } from '@/components/common/input'

interface SelectContextType {
  options: Option[]
  selectedValues: string[]
  searchTerm: string
  isMulti: boolean
  setSearchTerm: (value: string) => void
  toggleValue: (value: string) => void
  isSelected: (value: string) => boolean
}

const SelectContext = createContext<SelectContextType | null>(null)

const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('useSelectContext must be used within a Select.')
  }
  return context
}

interface SelectProps {
  options: Option[]
  isMulti?: boolean
  isSearchable?: boolean
  onChange: (values: string[]) => void
  children: React.ReactNode
}

export const Select = ({
  options,
  isMulti = false,
  isSearchable = false,
  onChange,
  children,
}: SelectProps): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleValue = (value: string) => {
    setSelectedValues(prev => {
      const isSelected = prev.includes(value)
      const newValues = isSelected
        ? prev.filter(v => v !== value)
        : isMulti
          ? [...prev, value]
          : [value]
      onChange(newValues)
      return newValues
    })
  }

  const isSelected = (value: string) => selectedValues.includes(value)

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
      }}
    >
      <Dropdown>{children}</Dropdown>
    </SelectContext.Provider>
  )
}

interface TriggerProps {
  placeholder?: string
}

const Trigger = ({
  placeholder = 'Select an option',
}: TriggerProps): JSX.Element => {
  const { selectedValues, isMulti, options } = useSelectContext()
  const selectedLabel = isMulti
    ? selectedValues.length
      ? `${options.find(o => o.value === selectedValues[0])?.label || ''} 외 ${
          selectedValues.length - 1
        }개`
      : ''
    : options.find(o => o.value === selectedValues[0])?.label || ''

  return (
    <Dropdown.Trigger className='trigger-box'>
      {selectedLabel || placeholder}
    </Dropdown.Trigger>
  )
}

const Menu = ({ children }: { children: React.ReactNode }) => {
  return <Dropdown.Menu>{children}</Dropdown.Menu>
}

const Option = ({ value, label }: Option): JSX.Element => {
  const { toggleValue, isSelected } = useSelectContext()
  const isSelectedStyle = isSelected(value) ? 'bg-gray-100' : ''

  return (
    <Dropdown.Item
      className={`option ${isSelectedStyle}`}
      onClick={() => toggleValue(value)}
    >
      {label}
    </Dropdown.Item>
  )
}

const Search = () => {
  const { searchTerm, setSearchTerm } = useSelectContext()
  return (
    <TextInput
      type='text'
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder='Search...'
      className='search-input'
    />
  )
}
