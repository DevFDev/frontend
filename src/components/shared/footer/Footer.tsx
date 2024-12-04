import { Link } from '@/components/common/button'
import { Container } from '@/components/common/containers'
import { Logo } from '@/components/common/logo'
import { Text } from '@/components/common/text'

const footerTabs = [
  { label: '고객센터', link: '/' },
  { label: '서비스이용약관', link: '/' },
  { label: '개인정보 처리방침', link: '/' },
  { label: '도움말', link: '/' },
]

export const Footer = (): JSX.Element => {
  return (
    <footer className='flex w-full justify-center border-t-1 border-solid border-gray-200'>
      <Container className='flex h-300 w-full flex-col py-40'>
        <div className='mb-20 flex items-center justify-between'>
          <Logo variant='secondary' />
          <div className='flex items-center justify-between gap-60'>
            {footerTabs.map(footerTab => (
              <Link
                href={footerTab.link}
                variant='text'
                className='h-24 px-0'
                key={footerTab.label}
              >
                {footerTab.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Container className='mb-8'>
            <Text.Body
              variant='body3'
              color='gray600'
              weight='500'
              className='flex items-center gap-10'
            >
              (주)DevForDev
              <div className='h-14 w-1 bg-gray-200' />
              대표 : 고용빈
            </Text.Body>
          </Container>
          <Container className='mb-8'>
            <Text.Body
              variant='body3'
              color='gray600'
              weight='500'
              className='flex items-center gap-10'
            >
              서울특별시 중구 삼일대로 343 대신파이낸스센터 8층
              <div className='h-14 w-1 bg-gray-200' />
              전화번호 : 02-521-8238
            </Text.Body>
          </Container>
          <Container className='mb-30'>
            <Text.Body
              variant='body3'
              color='gray600'
              weight='500'
              className='flex items-center gap-10'
            >
              사업자등록번호 : 000-00-00000
              <div className='h-14 w-1 bg-gray-200' />
              유료직업소개사업등록번호: (국내) 제0000-0000000-00-0-00000호
            </Text.Body>
          </Container>
        </div>
        <div className='mb-30 border-t-1 border-solid border-gray-200' />
        <Text.Caption variant='caption1' color='gray500' weight='500'>
          © 2024 DevForDev Lab, Inc.
        </Text.Caption>
      </Container>
    </footer>
  )
}
