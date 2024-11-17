import clsx from 'clsx'

import { Clickable, ClickableProps } from './Clickable'

export interface ButtonProps
  extends ClickableProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  onClick,
  type = 'button',
  disabled = false,
  fullWidth,
  ...props
}: ButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={clsx({ 'w-full': fullWidth })}
  >
    <Clickable {...props} disabled={disabled} fullWidth={fullWidth} />
  </button>
)
