import {
  Controller,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form'

import {
  CheckboxInput,
  CheckboxInputProps,
  PasswordInput,
  RadioInput,
  RadioInputProps,
  TagInput,
  TagInputProps,
  TextInput,
  TextInputProps,
} from '@/components/common/input'

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

const Text = ({
  name,
  rules,
  ...props
}: {
  name: string
  rules?: Record<string, unknown>
} & TextInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <TextInput {...field} {...props} />}
    />
  )
}

const Password = ({
  name,
  rules,
  ...props
}: {
  name: string
  rules?: Record<string, unknown>
} & Omit<TextInputProps, 'type'>): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <PasswordInput {...field} {...props} />}
    />
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
  options: { label: string; value: string }[]
} & CheckboxInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {options.map(option => (
            <CheckboxInput
              key={option.value}
              {...props}
              value={option.value}
              label={option.label}
              checked={(field.value || []).includes(option.value)}
              onChange={e => {
                const currentValue = field.value || []
                const newValue = e.target.checked
                  ? [...currentValue, option.value]
                  : currentValue.filter((v: string) => v !== option.value)
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
  options: { label: string; value: string }[]
} & RadioInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {options.map(option => (
            <RadioInput
              key={option.value}
              {...props}
              label={option.label}
              value={option.value}
              checked={field.value === option.value}
              onChange={() => field.onChange(option.value)}
            />
          ))}
        </>
      )}
    />
  )
}

const Tag = ({ name, ...props }: TagInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={() => <TagInput name={name} {...props} />}
    />
  )
}

Form.Text = Text
Form.Password = Password
Form.Checkbox = Checkbox
Form.Radio = Radio
Form.TagInput = Tag
