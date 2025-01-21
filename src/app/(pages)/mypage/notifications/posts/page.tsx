'use client'

import { IcProfile, IcSmallClose } from '@/assets/IconList'

import { Text } from '@/components/common/text'

import { notificationsMock } from '../n-mock'

export default function Posts(): JSX.Element {
  const sortedNotifications = [...notificationsMock].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className='min-h-375'>
      {sortedNotifications
        .filter(notification => notification.type === 'post')
        .map((notification, index) => (
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
                  {notification.title}
                </Text.Title>
                {/* 알림 내용 */}
                <Text.Body variant='body2' color='gray700'>
                  {notification.postTitle}
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
        ))}
    </div>
  )
}
