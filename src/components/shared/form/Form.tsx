import Image from 'next/image'

import {
  Controller,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext,
} from 'react-hook-form'

import { IcPlus } from '@/assets/IconList'
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
import { Text } from '@/components/common/text'
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
  name: string
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
    <div>
      <TextInput {...register(name)} error={Boolean(errors[name])} {...props} />
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
    </div>
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
  } = useFormContext()

  return (
    <>
      <PasswordInput
        {...register(name)}
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
      <TextArea {...register(name)} {...props} />
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
  label?: string | React.ReactNode
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

const FormFile = ({ name }: { name: string }): JSX.Element => {
  const { control, setValue, watch } = useFormContext()
  const {
    formState: { errors },
  } = useFormContext()

  const files = watch(name) || []

  const handleDelete = (index: number) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setValue(name, updatedFiles)
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <ul className='flex flex-wrap gap-4'>
          <label className='flex h-120 w-120 cursor-pointer flex-col items-center justify-center gap-4 rounded-6 border-1 border-solid border-gray-200'>
            <input
              type='file'
              multiple
              onChange={e => {
                const newFiles = Array.from(e.target.files || [])
                const updatedFiles = [...files, ...newFiles].filter(
                  (file, index, self) =>
                    self.findIndex(f => f.name === file.name) === index
                )

                field.onChange(updatedFiles)
              }}
              className='hidden'
            />
            <IcPlus width={24} height={24} />
            <Text.Body variant='body2' color='gray500'>
              업로드
            </Text.Body>
          </label>

          {files.map((file: File, index: number) => {
            return (
              <li
                key={file.name}
                className='relative h-120 w-120 overflow-hidden rounded-6 border-1 border-solid border-gray-200'
              >
                <Image
                  fill
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className='object-cover'
                />
                <button
                  type='button'
                  onClick={() => handleDelete(index)}
                  className='absolute right-6 top-6 flex h-20 w-20 items-center justify-center rounded-full bg-common-black/50 p-1 text-common-white'
                >
                  &times;
                </button>
              </li>
            )
          })}

          {errors[name]?.message && (
            <StatusMessage hasError>
              {String(errors[name]?.message)}
            </StatusMessage>
          )}
        </ul>
      )}
    />
  )
}

interface StatusMessageProps {
  className?: string
  children?: React.ReactNode
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
Form.File = FormFile
Form.Message = StatusMessage
