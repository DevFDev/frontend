import { Controller, useFormContext } from 'react-hook-form'

import { techStackOptions } from '@/constants/selectOptions'

import { DeletableChip } from '@/components/common/chip'
import { Text } from '@/components/common/text'
import { Select } from '@/components/shared/select'

interface TechStackSelectProps {
  name: string
}

export const TechStackSelect = ({
  name,
}: TechStackSelectProps): JSX.Element => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: '기술 스택을 선택해주세요.' }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Select
            options={techStackOptions}
            selectedValues={field.value}
            onMultiChange={field.onChange}
            isMulti
          >
            <Select.Trigger placeholder='기술 스택 선택' />
            <Select.Menu>
              {techStackOptions.map(({ label, value }: Option) => (
                <Select.Option key={value} value={value} label={label} />
              ))}
            </Select.Menu>
          </Select>
          <Text.Caption variant='caption1' color='gray500' className='mt-4'>
            최대 5개까지 선택 가능합니다.
          </Text.Caption>
          <div className='flex gap-4'>
            {field.value.map(stack => (
              <DeletableChip
                key={stack}
                label={stack}
                onDelete={() => {
                  field.onChange(field.value.filter(v => v !== stack))
                }}
              />
            ))}
          </div>
          {error?.message && (
            <Form.Message hasError={!!error}>{error.message}</Form.Message>
          )}
        </div>
      )}
    />
  )
}
