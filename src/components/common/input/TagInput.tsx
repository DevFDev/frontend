import { IcSearch } from '@/assets/IconList'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { DeletableChip } from '../chip'
import { TextInput, TextInputProps } from './TextInput'

interface TagInputProps extends Omit<TextInputProps, 'endAdornment'> {
  name: string
}

export const TagInput = ({ name, ...props }: TagInputProps) => {
  const { control, setValue, getValues } = useFormContext()
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {}

  const handleTagDelete = (id: string) => {}

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            endAdornment={
              <IcSearch width={24} height={24} aria-label='검색 아이콘' />
            }
          />
        )}
      />
      <div className='mt-10 flex flex-wrap gap-2'>
        {getValues(name)?.map((tag: { id: string; label: string }) => (
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
