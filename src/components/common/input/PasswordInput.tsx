import { IcEyeClosed, IcEyeOpen } from '@/assets/IconList'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import { useToggle } from '@/hooks/useToggle'

import { TextInput } from './TextInput'

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: ReturnType<UseFormRegister<FieldValues>>
  fullWidth?: boolean
}

export const PasswordInput = ({
  register,
  fullWidth = false,
  ...props
}: PasswordInputProps): JSX.Element => {
  const [isVisible, toggleVisibility] = useToggle()

  return (
    <TextInput
      {...register}
      type={isVisible ? 'text' : 'password'}
      fullWidth={fullWidth}
      endAdornment={
        <button onClick={toggleVisibility} type='button'>
          {isVisible ? (
            <IcEyeOpen width={24} height={24} />
          ) : (
            <IcEyeClosed width={24} height={24} />
          )}
        </button>
      }
      {...props}
    />
  )
}
