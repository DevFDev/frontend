import { IcEyeClosed, IcEyeOpen } from '@/assets/IconList'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { useToggle } from '@/hooks/useToggle'

import { TextInput, TextInputProps } from './TextInput'

interface PasswordInputProps
  extends Omit<TextInputProps, 'startAdornment' | 'endAdornment' | 'type'> {
  error?: boolean
  register?: ReturnType<UseFormRegister<FieldValues>>
  className?: string
  fullWidth?: boolean
}

export const PasswordInput = ({
  error = false,
  register,
  className = '',
  fullWidth = false,
  ...props
}: PasswordInputProps): JSX.Element => {
  const { isOpen: showPassword, toggle: toggleShowPassword } = useToggle()
  const visibilityIcon = showPassword ? (
    <IcEyeOpen width={24} height={24} />
  ) : (
    <IcEyeClosed width={24} height={24} />
  )

  return (
    <TextInput
      {...register}
      type={showPassword ? 'text' : 'password'}
      fullWidth={fullWidth}
      endAdornment={
        <button
          aria-label={showPassword ? '비밀번호 숨김' : '비밀번호 보임'}
          onClick={toggleShowPassword}
          type='button'
        >
          {visibilityIcon}
        </button>
      }
      {...props}
    />
  )
}
