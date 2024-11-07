import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ClickableProps {
  label?: string
  variant?: Variant
  size?: Size
  borderColor?: BorderColor
  backgroundColor?: BackgroundColor
  textColor?: TextColor
  startIcon?: React.ReactElement
  endIcon?: React.ReactElement
  fullWidth?: boolean
  leftAlign?: boolean
  disabled?: boolean
  className?: string
}

type Variant = 'contained' | 'outlined' | 'text'
type Size = 'sm' | 'md' | 'lg' | 'xl'
type BorderColor = 'blue' | 'gray'
type BackgroundColor = 'blue' | 'white' | 'gray' | 'transparentBlue'
type TextColor = 'blue' | 'white' | 'black' | 'gray400' | 'gray500' | 'gray600'

const baseStyle =
  'flex items-center justify-center gap-4 rounded-8 text-body1 font-medium'

const disabledStyle =
  'aria-disabled:border-0 aria-disabled:bg-gray-100 aria-disabled:text-gray-400 aria-disabled:cursor-not-allowed'

const styleByVariant: Record<Variant, string> = {
  contained: 'bg-primary-normal text-common-white active:bg-primary-strong',
  outlined:
    'border-1 border-solid border-primary-normal bg-common-white text-primary-normal',
  text: 'text-gray-1000',
}

const styleBySize: Record<Size, string> = {
  sm: 'h-40 px-12',
  md: 'h-44 px-16',
  lg: 'h-48 px-16',
  xl: 'h-52 px-20',
}

const styleByBorderColor: Record<BorderColor, string> = {
  gray: 'border-gray-200',
  blue: 'border-primary-normal',
}

const styleByBackgroundColor: Record<BackgroundColor, string> = {
  blue: 'bg-primary-normal',
  white: 'bg-common-white',
  gray: 'bg-gray-100',
  transparentBlue: 'bg-primary-transparent',
}

const styleByTextColor: Record<TextColor, string> = {
  blue: 'text-primary-normal',
  white: 'text-common-white',
  black: 'text-common-black',
  gray400: 'text-gray-400',
  gray500: 'text-gray-500',
  gray600: 'text-gray-600',
}

export const Clickable = ({
  label = '',
  variant = 'contained',
  size = 'md',
  borderColor,
  backgroundColor,
  textColor,
  startIcon,
  endIcon,
  fullWidth = false,
  leftAlign = false,
  disabled = false,
  className = '',
}: ClickableProps): JSX.Element => {
  const borderColorClass = borderColor ? styleByBorderColor[borderColor] : ''
  const backgroundColorClass = backgroundColor
    ? styleByBackgroundColor[backgroundColor]
    : ''
  const textColorClass = textColor ? styleByTextColor[textColor] : ''

  const clickableStyle = twMerge(
    baseStyle,
    styleByVariant[variant],
    styleBySize[size],
    textColorClass,
    clsx({
      [borderColorClass]: variant === 'outlined',
      [backgroundColorClass]: variant !== 'text',
      [disabledStyle]: disabled,
      'w-full': fullWidth,
      'justify-start': leftAlign,
    }),
    className
  )

  return (
    <span className={clickableStyle} aria-disabled={disabled}>
      {startIcon}
      {label}
      {endIcon}
    </span>
  )
}
