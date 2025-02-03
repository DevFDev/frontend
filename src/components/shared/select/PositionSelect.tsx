import { Controller, useFormContext } from 'react-hook-form'

import { positionOptions } from '@/constants/selectOptions'

import { Select } from '@/components/shared/select'

interface PositionSelectProps {
  name: string
}

export const PositionSelect = ({ name }: PositionSelectProps): JSX.Element => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: '모집 유형을 선택해주세요.' }}
      render={({ field }) => (
        <Select
          options={positionOptions}
          selectedValue={field.value || ''}
          onSingleChange={field.onChange}
        >
          <Select.Trigger placeholder='포지션 선택' />
          <Select.Menu>
            {positionOptions.map(({ label, value }: Option) => (
              <Select.Option key={value} value={value} label={label} />
            ))}
          </Select.Menu>
        </Select>
      )}
    />
  )
}
