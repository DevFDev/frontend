'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Text } from '@/components/common/text'

const notificationNavLinks = [
  {
    path: '/mypage/notifications',
    label: '전체',
    width: 'w-28',
  },
  {
    path: '/mypage/notifications/posts',
    label: '게시글',
    width: 'w-41',
  },
  {
    path: '/mypage/notifications/likes',
    label: '좋아요',
    width: 'w-41',
  },
  {
    path: '/mypage/notifications/recruitments',
    label: '채용',
    width: 'w-28',
  },
]

const NotificationsLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const pathname = usePathname()

  return (
    <div>
      <Text.Heading as='h2' variant='heading2' className='pb-8 pt-33'>
        알림
      </Text.Heading>
      <Text.Body variant='body2' color='gray600' className='pb-20'>
        알림 설정 및 한 번에 모아보실 수 있습니다.
      </Text.Body>
      <div className='mb-20 rounded-12 bg-common-white p-40'>
        <div className='mb-22 mt-20 flex flex-col'>
          <div className='flex gap-x-40'>
            {notificationNavLinks.map(({ path, label, width }) => (
              <Link key={path} href={path} className={`h-24 ${width}`}>
                {pathname === path ? (
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
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default NotificationsLayout
