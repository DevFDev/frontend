import NextLink from 'next/link'

import clsx from 'clsx'

import { Clickable, ClickableProps } from './Clickable'

export interface LinkProps
  extends ClickableProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = ({
  href = '#',
  disabled,
  onClick = () => {},
  fullWidth,
  ...props
}: LinkProps): JSX.Element => (
  <NextLink
    href={href}
    passHref
    aria-disabled={disabled}
    onClick={e => {
      if (disabled) {
        e.preventDefault()
      } else {
        onClick(e)
      }
    }}
    className={clsx({ 'w-full': fullWidth })}
  >
    <Clickable {...props} disabled={disabled} fullWidth={fullWidth} />
  </NextLink>
)
