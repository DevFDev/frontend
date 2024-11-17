import { IcEyeClosed, IcEyeOpen } from '@/assets/IconList'

import { useToggle } from '@/hooks/useToggle'

import { TextInput, TextInputProps } from './TextInput'

type PasswordInputProps = Omit<
  TextInputProps,
  'startAdornment' | 'endAdornment' | 'type'
>

export const PasswordInput = ({
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
      type={showPassword ? 'text' : 'password'}
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
