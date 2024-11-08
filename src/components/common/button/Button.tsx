import { Clickable, ClickableProps } from './Clickable'

interface ButtonProps
  extends ClickableProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  onClick,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps): JSX.Element => (
  <button onClick={onClick} type={type} disabled={disabled}>
    <Clickable {...props} disabled={disabled} />
  </button>
)
