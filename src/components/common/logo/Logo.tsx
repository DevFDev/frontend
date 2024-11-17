import Link from 'next/link'

import { LogoBlack, LogoGray, LogoWhite } from '@/assets/logoList'

type Variant = 'default' | 'primary' | 'secondary'

type LogoProps = { variant?: Variant }

const logoByVariant: Record<Variant, React.ReactElement> = {
  default: <LogoBlack />,
  primary: <LogoWhite />,
  secondary: <LogoGray />,
}

export const Logo = ({ variant = 'default' }: LogoProps): JSX.Element => {
  const logo = logoByVariant[variant]

  return <Link href={'/'}>{logo}</Link>
}
