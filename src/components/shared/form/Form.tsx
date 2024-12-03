import {
  Controller,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form'

import { CheckboxInput, RadioInput } from '@/components/common/input'
import { CheckboxInputProps } from '@/components/common/input/CheckboxInput'
import { RadioInputProps } from '@/components/common/input/RadioInput'

interface FormProps<TFieldValues extends FieldValues>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  methods: UseFormReturn<TFieldValues>
  children: React.ReactNode
}

export const Form = <TFieldValues extends FieldValues>({
  methods,
  children,
  ...props
}: FormProps<TFieldValues>): JSX.Element => {
  return (
    <FormProvider {...methods}>
      <form {...props}>{children}</form>
    </FormProvider>
  )
}

const Checkbox = ({
  name,
  rules,
  options,
  ...props
}: {
  name: string
  rules?: Record<string, unknown>
  options: string[]
} & CheckboxInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {options.map(value => (
            <CheckboxInput
              key={value}
              {...props}
              value={value}
              checked={field.value?.includes(value)}
              onChange={e => {
                const newValue = e.target.checked
                  ? [...field.value, value]
                  : field.value.filter((v: string) => v !== value)
                field.onChange(newValue)
              }}
            />
          ))}
        </>
      )}
    />
  )
}

const Radio = ({
  name,
  rules,
  options,
  ...props
}: {
  name: string
  rules?: Record<string, unknown>
  options: string[]
} & RadioInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {options.map(value => (
            <RadioInput
              key={value}
              {...props}
              value={value}
              checked={field.value === value}
              onChange={() => field.onChange(value)}
            />
          ))}
        </>
      )}
    />
  )
}

Form.Checkbox = Checkbox
Form.Radio = Radio
