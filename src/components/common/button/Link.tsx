import NextLink from 'next/link'

import { cn } from '@/lib/utils'

import { Clickable, ClickableProps } from './Clickable'

export interface LinkProps
  extends ClickableProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Link = ({
  href = '#',
  fullWidth,
  ...props
}: LinkProps): JSX.Element => (
  <NextLink
    href={href}
    passHref
    className={cn('block w-max', { 'w-full': fullWidth })}
  >
    <Clickable {...props} fullWidth={fullWidth} />
  </NextLink>
)
