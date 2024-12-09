import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { IcSearch } from '@/assets/IconList'

import { DeletableChip } from '../chip'
import { TextInput, TextInputProps } from './TextInput'

interface TagProps {
  id: string
  label: string
}

export interface TagInputProps extends Omit<TextInputProps, 'endAdornment'> {
  name: string
}

export const TagInput = ({ name, ...props }: TagInputProps): JSX.Element => {
  const { control, setValue, getValues } = useFormContext()
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault()
      const newTag: TagProps = {
        id: crypto.randomUUID(),
        label: inputValue.trim(),
      }
      const currentTags = getValues(name) || []
      setValue(name, [...currentTags, newTag])
      setInputValue('')
    }
  }

  const handleTagDelete = (id: string): void => {
    const updatedTags =
      getValues(name)?.filter((tag: TagProps) => tag.id !== id) || []
    setValue(name, updatedTags)
  }

  return (
    <div>
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
      <div className='mt-10 flex flex-wrap gap-x-4'>
        {getValues(name)?.map((tag: TagProps) => (
          <DeletableChip
            key={tag.id}
            label={tag.label}
            onDelete={() => handleTagDelete(tag.id)}
          />
        ))}
      </div>
    </div>
  )
}
