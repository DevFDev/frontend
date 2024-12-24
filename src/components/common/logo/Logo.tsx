import Link from 'next/link'

import { LogoBlack, LogoGray, LogoWhite } from '@/assets/logoList'

type Variant = 'default' | 'primary' | 'secondary'

type LogoProps = { variant?: Variant }

const logoByVariant: Record<Variant, React.ReactElement> = {
  default: <LogoBlack width={200} height={40} />,
  primary: <LogoWhite width={200} height={40} />,
  secondary: <LogoGray width={200} height={40} />,
}

export const Logo = ({ variant = 'default' }: LogoProps): JSX.Element => {
  const logo = logoByVariant[variant]

  return <Link href={'/'}>{logo}</Link>
}
