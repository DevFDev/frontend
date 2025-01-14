import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { IcSearch } from '@/assets/IconList'

import { DeletableChip } from '../chip'
import { TextInput, TextInputProps } from './TextInput'

export interface TagInputProps
  extends Omit<TextInputProps, 'endAdornment' | 'startAdorment'> {
  name: string
}

export const TagInput = ({ name, ...props }: TagInputProps): JSX.Element => {
  const { control, setValue, getValues } = useFormContext()
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const trimmedInputValue = inputValue.trim()
    if (event.key === 'Enter' && trimmedInputValue) {
      event.preventDefault()

      const newTag = trimmedInputValue

      const currentTags = getValues(name) || []
      if (currentTags.includes(newTag)) {
      } else {
        setValue(name, [...currentTags, newTag])
        setInputValue('')
      }
    }
  }

  const handleTagDelete = (targetTag: string): void => {
    const updatedTags =
      getValues(name).filter((tag: string) => tag !== targetTag) || []
    setValue(name, updatedTags)
  }

  return (
    <div className='flex flex-col gap-10'>
      <Controller
        name={name}
        control={control}
        render={({ field: { value: _value, onChange: _onChange } }) => (
          <TextInput
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            endAdornment={
              <IcSearch width={24} height={24} aria-label='검색 아이콘' />
            }
            {...props}
          />
        )}
      />
      <div className='flex flex-wrap gap-x-4'>
        {getValues(name).map((tag: string) => (
          <DeletableChip
            key={tag}
            label={tag}
            onDelete={() => handleTagDelete(tag)}
          />
        ))}
      </div>
    </div>
  )
}
