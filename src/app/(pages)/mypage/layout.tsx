'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IcProfile } from '@/assets/IconList'

import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'

const navLinks = [
  {
    path: '/mypage/profile',
    label: '프로필',
    activePaths: ['/mypage/profile', '/mypage'],
    width: 'w-42',
  },
  {
    path: '/mypage/activity',
    label: '활동내역',
    activePaths: [
      '/mypage/activity',
      '/mypage/activity/myposts',
      '/mypage/activity/comments',
      '/mypage/activity/likeposts',
    ],
    width: 'w-55',
  },
  {
    path: '/mypage/notifications',
    label: '알림',
    activePaths: [
      '/mypage/notifications',
      '/mypage/notifications/posts',
      '/mypage/notifications/comments',
      '/mypage/notifications/likes',
      '/mypage/notifications/recruitments',
    ],
    width: 'w-28',
  },
]

const MyPageLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const pathname = usePathname()

  return (
    <div className='flex w-full flex-col items-center bg-gray-100 pt-80'>
      <div className='flex flex-row gap-x-30'>
        {/* 사이드 프로필 부분 */}
        <div className='h-320 pr-36'>
          <button className='mb-40'>
            <IcProfile width='180' height='180' />
          </button>
          <div className='flex flex-col'>
            {/* 유저 이름 */}
            <Text.Heading as='h2' variant='heading2' className='mb-4'>
              홍길동
            </Text.Heading>

            {/* 이메일 주소 */}
            <Text.Body variant='body2' color='gray500' className='mb-10'>
              gildong@naver.com
            </Text.Body>

            {/* 팔로잉 / 팔로워 */}
            <div className='flex flex-row gap-x-8'>
              <div className='flex flex-row gap-x-4'>
                <Text.Title variant='title1' color='gray500'>
                  팔로워
                </Text.Title>
                <Text.Title variant='title1' color='gray800'>
                  0
                </Text.Title>
              </div>
              <Text.Title variant='title1' color='gray600'>
                ‧
              </Text.Title>
              <div className='flex flex-row gap-x-4'>
                <Text.Title variant='title1' color='gray500'>
                  팔로잉
                </Text.Title>
                <Text.Title variant='title1' color='gray800'>
                  0
                </Text.Title>
              </div>
            </div>
          </div>
        </div>

        {/* 가운데 프로필 부분 */}
        <div className='flex w-954 flex-col'>
          <div className='flex gap-x-40'>
            {navLinks.map(({ path, label, activePaths, width }) => (
              <Link key={path} href={path} className={`h-24 ${width}`}>
                {activePaths.includes(pathname) ? (
                  <Text.Title
                    variant='title2'
                    color='gray800'
                    weight='700'
                    className='border-b-2 border-primary-normal pb-12'
                  >
                    {label}
                  </Text.Title>
                ) : (
                  <Text.Body variant='body2' color='gray800'>
                    {label}
                  </Text.Body>
                )}
              </Link>
            ))}
          </div>
          <Divider isVertical={false} className='mt-12' />
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default MyPageLayout
