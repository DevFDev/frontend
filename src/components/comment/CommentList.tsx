import Image from 'next/image'

import { IcEdit, IcKebabMenu, IcSiren, IcTrashBin } from '@/assets/IconList'

import { useAuthStore } from '@/stores/useAuthStore'

import { Dropdown } from '../common/dropdown'
import { Text } from '../common/text'

interface Writer {
  id: number
  nickname: string
  imageUrl: string
}

interface CommentListProps {
  writer: Writer
  content: string
  createdAt: string
}

export const CommentList = ({
  writer,
  content,
  createdAt,
}: CommentListProps): JSX.Element => {
  const user = useAuthStore(state => state.user)

  return (
    <div className='m-auto flex w-1104 justify-between pt-20'>
      <div className='flex gap-x-8'>
        <Image
          alt='프로필 이미지'
          src={writer.imageUrl}
          width='48'
          height='48'
          className='mb-10 rounded-full'
        />
        <div className='flex flex-col gap-y-10'>
          <div className='flex gap-x-10'>
            <Text.Title variant='title2' color='gray800' weight='700'>
              {writer.nickname}
            </Text.Title>
            <Text.Body variant='body2' color='gray600'>
              {createdAt}
            </Text.Body>
          </div>
          <div className='flex gap-x-8'>
            <Text.Body variant='body2' color='highlight'>
              {/* TODO: 이 부분 API 어떻게 가져와야 할 지  */}
              @망곰아 사랑해
            </Text.Body>
            <Text.Body variant='body2' color='gray800'>
              {content}
            </Text.Body>
          </div>
        </div>
      </div>
      <Dropdown className='relative'>
        <Dropdown.Trigger className='flex h-24 w-24 items-center justify-center'>
          <IcKebabMenu width={24} height={24} />
        </Dropdown.Trigger>
        <Dropdown.Menu position='dropdown' alignment='right' className='w-156'>
          {user?.id === writer.id ? (
            <>
              <Dropdown.Item onClick={() => console.log('신고하기')}>
                <div className='flex items-center gap-x-4'>
                  <IcEdit width={24} height={24} />
                  <Text.Body variant='body2' color='gray800'>
                    수정하기
                  </Text.Body>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log('신고하기')}>
                <div className='flex items-center gap-x-4'>
                  <IcTrashBin width={24} height={24} />
                  <Text.Body variant='body2' color='gray800'>
                    삭제하기
                  </Text.Body>
                </div>
              </Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item onClick={() => console.log('신고하기')}>
              <div className='flex items-center gap-x-4'>
                <IcSiren width={24} height={24} />
                <Text.Body variant='body2' color='gray800'>
                  신고하기
                </Text.Body>
              </div>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
