'use client'

import { IcProfile, IcSmallClose } from '@/assets/IconList'

import { Text } from '@/components/common/text'

import { notificationsMock } from './n-mock'

type NotificationType = 'post' | 'like' | 'comment' | 'job'

const isValidType = (type: string): type is NotificationType =>
  ['post', 'like', 'comment', 'job'].includes(type)

export default function Notifications(): JSX.Element {
  const sortedNotifications = [...notificationsMock].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className='min-h-375'>
      {sortedNotifications.map((notification, index) => {
        if (!isValidType(notification.type)) {
          console.warn(`알 수 없는 알림 유형입니다: ${notification.type}`)
          return null
        }

        return (
          <div
            key={index}
            className='flex flex-row gap-x-8 border-b-1 border-b-gray-200 py-12'
          >
            {/* 유저 프로필 이미지 */}
            <IcProfile width='24' height='24' />
            <div className='flex w-842 justify-between'>
              <div className='flex flex-col gap-y-4'>
                {/* 알림 제목 */}
                <Text.Title variant='title2' color='gray800' weight='700'>
                  {notification.type === 'post' &&
                    `${notification.userName}님의 새로운 글이 등록되었습니다.`}
                  {notification.type === 'like' &&
                    `${notification.userName}님이 좋아요를 눌렀습니다.`}
                  {notification.type === 'comment' && notification.title}
                  {notification.type === 'job' && notification.title}
                </Text.Title>
                {/* 알림 내용 */}
                <Text.Body variant='body2' color='gray700'>
                  {notification.type === 'post' && notification.postTitle}
                  {notification.type === 'comment' && notification.userName}
                  {notification.type === 'like' && notification.userName}
                  {notification.type === 'job' && notification.companyName}
                </Text.Body>
              </div>
              <div className='flex flex-col items-end gap-y-10'>
                {/* 날짜 정보 */}
                <Text.Body variant='body3' color='gray600'>
                  {new Date(notification.date).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </Text.Body>
                <IcSmallClose width='16' height='16' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
