'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Text } from '@/components/common/text'

const ActivityLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const pathname = usePathname()

  return (
    <div className='h-auto max-w-954'>
      <Text.Heading as='h2' variant='heading2' className='pb-8 pt-33'>
        활동내역
      </Text.Heading>
      <Text.Body variant='body2' color='gray600' className='pb-20'>
        내가 작성한 글, 댓글, 좋아요한 글 등 모든 활동 내용을 확인할 수
        있습니다.
      </Text.Body>
      <div className='flex w-954 flex-col'>
        <div className='flex gap-x-40'>
          <Link href='/mypage/activity/myposts' className='h-24 w-45'>
            {pathname === '/mypage/activity/myposts' ||
            pathname === '/mypage/activity' ? (
              <Text.Title
                variant='title2'
                color='gray800'
                weight='700'
                className='border-b-2 border-primary-normal pb-12'
              >
                작성 글
              </Text.Title>
            ) : (
              <Text.Body variant='body2' color='gray800'>
                작성 글
              </Text.Body>
            )}
          </Link>
          <Link href='/mypage/activity/comments' className='h-24 w-28'>
            {pathname === '/mypage/activity/comments' ? (
              <Text.Title
                variant='title2'
                color='gray800'
                weight='700'
                className='border-b-2 border-primary-normal pb-12'
              >
                댓글
              </Text.Title>
            ) : (
              <Text.Body variant='body2' color='gray800'>
                댓글
              </Text.Body>
            )}
          </Link>
          <Link href='/mypage/activity/likeposts' className='h-24 w-72'>
            {pathname === '/mypage/activity/likeposts' ? (
              <Text.Title
                variant='title2'
                color='gray800'
                weight='700'
                className='border-b-2 border-primary-normal pb-12'
              >
                좋아요한 글
              </Text.Title>
            ) : (
              <Text.Body variant='body2' color='gray800'>
                좋아요한 글
              </Text.Body>
            )}
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ActivityLayout
