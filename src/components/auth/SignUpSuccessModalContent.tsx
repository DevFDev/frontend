import Image from 'next/image'
import NextLink from 'next/link'

import { Link } from '@/components/common/button'
import { Box } from '@/components/common/containers'
import { Text } from '@/components/common/text'

import useModalStore from '@/stores/useModalStore'

import celebrateImage from '/public/assets/images/img-celebration.png'

export const SignUpSuccessModalContent = (): JSX.Element => {
  const { closeModal } = useModalStore()
  return (
    <div className={'flex flex-col items-center gap-20 text-center'}>
      <div className={'h-100 w-100'}>
        <Image src={celebrateImage} alt={'축하 이미지'} />
      </div>
      <div className={'flex flex-col gap-8'}>
        <Text.Heading as={'h2'} variant={'heading4'} color={'gray800'}>
          회원가입 완료!
        </Text.Heading>
        <Text.Body variant={'body1'} color={'gray600'}>
          홍길동님의 회원가입이
          <br />
          성공적으로 완료되었습니다.
        </Text.Body>
      </div>
      <Box variant={'contained'} color={'secondary'} className='px-12 py-8'>
        <Text.Body variant={'body3'} color={'gray600'}>
          *나의 정보 확인 및 수정은{' '}
          <NextLink
            href={'/'}
            className={'text-primary-normal'}
            onClick={closeModal}
          >
            {'마이페이지 > 프로필'}
          </NextLink>
          에서 가능합니다.
        </Text.Body>
      </Box>
      <Link
        href={'/team'}
        label={'로그인 바로가기'}
        // onClick={closeModal}
        size={'lg'}
        fullWidth
        className={'text-title2'}
      ></Link>
    </div>
  )
}
