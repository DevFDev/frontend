import clsx from 'clsx'

import { Link } from '@/components/common/button'
import { Container } from '@/components/common/containers'
import { Logo } from '@/components/common/logo'

import { HeaderUserMenu } from './HeaderUserMenu'

const headerTabs = [
  { label: '포트폴리오', link: '/portfolio' },
  { label: '프로젝트', link: '/project' },
  { label: '팀원찾기', link: '/team' },
  { label: '커뮤니티', link: '/community' },
]

type HeaderProps = {
  isAuthenticated: boolean
  user: User | null
  currentPage?: string
}

const renderUserMenu = (isAuthenticated: boolean, user: User | null) => {
  return isAuthenticated && user ? (
    <HeaderUserMenu user={user} />
  ) : (
    <Container className='flex items-center justify-between gap-12'>
      <Link href='/auth/sign-in' variant='outlined' size='lg'>
        로그인
      </Link>
      <Link href='/auth/sign-up' size='lg'>
        회원가입
      </Link>
    </Container>
  )
}

export const Header = ({
  isAuthenticated,
  user = null,
  currentPage = '/',
}: HeaderProps): JSX.Element => {
  return (
    <header className='flex w-full justify-center'>
      <Container className='flex h-72 w-full items-center justify-between gap-188'>
        <Logo />
        <Container className='flex flex-grow items-center justify-between'>
          <Container className='flex items-center justify-between gap-40'>
            {headerTabs.map(headerTab => (
              <Link
                href={headerTab.link}
                variant='text'
                size='lg'
                className={clsx('w-118 hover:text-primary-normal', {
                  'text-primary-normal': currentPage === headerTab.link,
                })}
                key={headerTab.label}
              >
                {headerTab.label}
              </Link>
            ))}
          </Container>
          {renderUserMenu(isAuthenticated, user)}
        </Container>
      </Container>
    </header>
  )
}
