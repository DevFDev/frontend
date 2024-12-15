import {
  Controller,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form'

import {
  FormField,
  PASSWORD_CONFIRM_RULES,
  VALIDATION_RULES,
} from '@/constants/formValidation'
import clsx from 'clsx'

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
import { TextArea } from '@/components/common/textarea'
import { TextAreaProps } from '@/components/common/textarea/TextArea'

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
  ...props
}: {
  name: FormField
} & TextInputProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <TextInput
        {...register(name, VALIDATION_RULES[name])}
        error={Boolean(errors[name])}
        {...props}
      />
      {errors[name] && (
        <StatusMessage hasError={true}>
          {String(errors[name]?.message as string)}
        </StatusMessage>
      )}
    </>
  )
}

const Password = ({
  name,
  ...props
}: {
  name: FormField
  rules?: Record<string, unknown>
} & Omit<TextInputProps, 'type'>): JSX.Element => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext()
  const registerOptions =
    name === 'passwordConfirmation'
      ? PASSWORD_CONFIRM_RULES(getValues('password'))
      : VALIDATION_RULES[name]

  return (
    <>
      <PasswordInput {...register(name, registerOptions)} {...props} />
      {errors[name]?.message && (
        <StatusMessage hasError={Boolean(errors[name])}>
          {errors[name].message as string}
        </StatusMessage>
      )}
    </>
  )
}

const Introduce = ({
  name,
  ...props
}: { name: FormField } & TextAreaProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <TextArea {...register(name, VALIDATION_RULES[name])} {...props} />
      {errors[name] && (
        <StatusMessage hasError={Boolean(errors[name])}>
          {String(errors[name].message)}
        </StatusMessage>
      )}
    </>
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

const Tag = ({
  name,
  rules,
  ...props
}: {
  name: string
  rules?: Record<string, unknown>
} & TagInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => <TagInput {...field} {...props} />}
    />
  )
}

interface StatusMessageProps {
  className?: string
  children: string
  hasError: boolean
}

const StatusMessage = ({
  className,
  children,
  hasError,
}: StatusMessageProps): JSX.Element => {
  const baseClass = 'mt-4 text-caption1 font-medium'
  const statusClass = clsx({
    'text-semantic-negative': hasError,
    'text-semantic-positive': !hasError,
  })

  return (
    <span className={clsx(baseClass, statusClass, className)}>{children}</span>
  )
}

Form.Text = Text
Form.Password = Password
Form.Introduce = Introduce
Form.Checkbox = Checkbox
Form.Radio = Radio
Form.TagInput = Tag
