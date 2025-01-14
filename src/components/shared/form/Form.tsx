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

const FormText = ({
  name,
  ...props
}: {
  name: FormField
} & TextInputProps): JSX.Element => {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext()
  const value = watch(name)
  const isError = touchedFields[name] && errors[name]
  const isSuccess = touchedFields[name] && !errors[name] && value

  return (
    <>
      <TextInput
        {...register(name, VALIDATION_RULES[name])}
        error={Boolean(errors[name])}
        {...props}
      />
      {isError && (
        <StatusMessage hasError={true}>
          {String(errors[name]?.message as string)}
        </StatusMessage>
      )}
      {/* TODO: 이미 가입된 이메일 확인하는 로직 추가하면서 수정 필요 */}
      {/* {isSuccess && (
        <StatusMessage hasError={false}>
          가입 가능한 이메일입니다.
        </StatusMessage>
      )} */}
    </>
  )
}

const FormPassword = ({
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
      <PasswordInput
        {...register(name, registerOptions)}
        {...props}
        error={Boolean(errors[name])}
      />
      {errors[name]?.message && (
        <StatusMessage hasError={Boolean(errors[name])}>
          {errors[name].message as string}
        </StatusMessage>
      )}
    </>
  )
}

const FormTextArea = ({
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

const FormCheckbox = ({
  name,
  rules,
  options,
  label,
  ...props
}: {
  name: string
  rules?: Record<string, unknown>
  options?: { label: string; value: string }[]
  label?: string
} & CheckboxInputProps): JSX.Element => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <>
          {options ? (
            options.map(option => (
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
            ))
          ) : (
            <CheckboxInput
              {...props}
              label={label}
              checked={field.value || false}
              onChange={e => field.onChange(e.target.checked)}
            />
          )}
        </>
      )}
    />
  )
}

const FormRadio = ({
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

const FormTag = ({ ...props }: TagInputProps): JSX.Element => {
  const { name } = props
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <TagInput {...props} />
      {errors[name]?.message && (
        <StatusMessage hasError>{errors[name].message as string}</StatusMessage>
      )}
    </>
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

Form.Text = FormText
Form.Password = FormPassword
Form.TextArea = FormTextArea
Form.Checkbox = FormCheckbox
Form.Radio = FormRadio
Form.TagInput = FormTag
Form.Message = StatusMessage
