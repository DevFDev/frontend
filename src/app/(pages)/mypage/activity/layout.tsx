'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Text } from '@/components/common/text'

const navLinks = [
  {
    path: '/mypage/activity/myposts',
    label: '작성 글',
    activePaths: ['/mypage/activity/myposts', '/mypage/activity'],
    width: 'w-45',
  },
  {
    path: '/mypage/activity/comments',
    label: '댓글',
    activePaths: ['/mypage/activity/comments'],
    width: 'w-28',
  },
  {
    path: '/mypage/activity/likeposts',
    label: '좋아요한 글',
    activePaths: ['/mypage/activity/likeposts'],
    width: 'w-72',
  },
]

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
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ActivityLayout
