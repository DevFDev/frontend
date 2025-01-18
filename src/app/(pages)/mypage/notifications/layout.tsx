'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useState } from 'react'

import { Switch } from '@/components/common/switch/Switch'
import { Text } from '@/components/common/text'

const notificationSettings = [
  {
    key: 'post',
    title: '게시글',
    description: '내가 팔로우한 사람이 새 글을 작성하면 알림을 받을 수 있어요',
  },
  {
    key: 'comment',
    title: '댓글',
    description:
      '내 게시글에 댓글 또는 내 댓글에 답글이 달리면 알림을 받을 수 있어요',
  },
  {
    key: 'like',
    title: '좋아요',
    description: '내 게시글에 누군가 좋아요를 누르면 알림을 받을 수 있어요',
  },
  {
    key: 'job',
    title: '채용',
    description:
      '좋아요한 기업에 새로운 공고가 등록되면 알림을 받을 수 있어요.',
  },
]
const NotificationsLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const pathname = usePathname()

  const [notifications, setNotifications] = useState({
    post: false,
    comment: false,
    like: false,
    job: false,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div>
      <Text.Heading as='h2' variant='heading2' className='pb-8 pt-33'>
        알림
      </Text.Heading>
      <Text.Body variant='body2' color='gray600' className='pb-20'>
        알림 설정 및 한 번에 모아보실 수 있습니다.
      </Text.Body>
      <div className='mb-20 rounded-12 bg-common-white p-40'>
        <Text.Heading as='h5' variant='heading5' color='gray800'>
          설정
        </Text.Heading>

        {notificationSettings.map(({ key, title, description }) => (
          <div key={key} className='flex flex-row justify-between pt-20'>
            <div className='w-418'>
              <Text.Title variant='title2' weight='700' color='gray800'>
                {title}
              </Text.Title>
              <Text.Body variant='body2' color='gray600'>
                {description}
              </Text.Body>
            </div>
            <Switch
              isOn={notifications[key as keyof typeof notifications]}
              onToggle={() =>
                toggleNotification(key as keyof typeof notifications)
              }
            />
          </div>
        ))}
      </div>
      <div className='mb-20 rounded-12 bg-common-white p-40'>
        <Text.Heading as='h5' variant='heading5' color='gray800'>
          알림 소식
        </Text.Heading>
        <Text.Body variant='body2' color='gray600' className='mt-8'>
          최대 30개까지 확인하실 수 있습니다.
        </Text.Body>

        <div className='mb-22 mt-20 flex flex-col'>
          <div className='flex gap-x-40'>
            <Link href='/mypage/notifications' className='h-24 w-28'>
              {pathname === '/mypage/notifications' ? (
                <Text.Title
                  variant='title2'
                  color='gray800'
                  weight='700'
                  className='border-b-2 border-primary-normal pb-12'
                >
                  전체
                </Text.Title>
              ) : (
                <Text.Body variant='body2' color='gray800'>
                  전체
                </Text.Body>
              )}
            </Link>
            <Link href='/mypage/notifications/posts' className='h-24 w-41'>
              {pathname === '/mypage/notifications/posts' ? (
                <Text.Title
                  variant='title2'
                  color='gray800'
                  weight='700'
                  className='border-b-2 border-primary-normal pb-12'
                >
                  게시글
                </Text.Title>
              ) : (
                <Text.Body variant='body2' color='gray800'>
                  게시글
                </Text.Body>
              )}
            </Link>
            <Link href='/mypage/notifications/comments' className='h-24 w-28'>
              {pathname === '/mypage/notifications/comments' ? (
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
            <Link href='/mypage/notifications/likes' className='h-24 w-41'>
              {pathname === '/mypage/notifications/likes' ? (
                <Text.Title
                  variant='title2'
                  color='gray800'
                  weight='700'
                  className='border-b-2 border-primary-normal pb-12'
                >
                  좋아요
                </Text.Title>
              ) : (
                <Text.Body variant='body2' color='gray800'>
                  좋아요
                </Text.Body>
              )}
            </Link>
            <Link
              href='/mypage/notifications/recruitments'
              className='h-24 w-28'
            >
              {pathname === '/mypage/notifications/recruitments' ? (
                <Text.Title
                  variant='title2'
                  color='gray800'
                  weight='700'
                  className='border-b-2 border-primary-normal pb-12'
                >
                  채용
                </Text.Title>
              ) : (
                <Text.Body variant='body2' color='gray800'>
                  채용
                </Text.Body>
              )}
            </Link>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default NotificationsLayout
