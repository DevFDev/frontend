import { IcBin } from '@/assets/IconList'

import { ModalContent } from '@/components/shared/modalContent'

export const PostDeleteAlertModalContent = ({
  onDelete,
}: {
  onDelete: () => void
}): JSX.Element => {
  return (
    <ModalContent>
      <IcBin className={'text-semantic-negative'} width={100} height={100} />
      <ModalContent.Header title={'정말로 이 게시물을 삭제하시겠습니까?'} />
      <ModalContent.InfoBox
        firstLabel={'삭제된 게시물은 다시 복구가 불가능합니다.'}
      />
      <div className='flex w-full gap-8'>
        <ModalContent.Button variant='outlined'>취소</ModalContent.Button>
        <ModalContent.Button
          className='bg-semantic-negative active:bg-semantic-negative/90'
          onClick={onDelete}
        >
          삭제
        </ModalContent.Button>
      </div>
    </ModalContent>
  )
}
