import NextLink from 'next/link'

import { Clickable, ClickableProps } from './Clickable'

interface LinkProps
  extends ClickableProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = ({
  href = '#',
  disabled,
  ...props
}: LinkProps): JSX.Element => (
  <NextLink
    href={href}
    passHref
    aria-disabled={disabled}
    onClick={e => {
      if (disabled) {
        e.preventDefault()
      }
    }}
  >
    <Clickable {...props} disabled={disabled} />
  </NextLink>
)
