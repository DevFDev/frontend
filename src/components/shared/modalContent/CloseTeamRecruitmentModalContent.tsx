import { ModalContent } from '@/components/shared/modalContent'

import checkImage from '/public/assets/images/img-check.png'

export const CloseTeamRecruitmentModalContent = ({
  onClose,
}: {
  onClose: () => void
}): JSX.Element => {
  return (
    <ModalContent>
      <ModalContent.Image src={checkImage} alt={'체크 이미지'} />
      <ModalContent.Header title={'정말로 모집 공고를 마감하시겠습니까?'} />
      <ModalContent.InfoBox
        firstLabel={'마감된 공고는 다시 열릴 수 없습니다.'}
      />
      <div className='flex w-full gap-8'>
        <ModalContent.Button variant='outlined'>취소</ModalContent.Button>
        <ModalContent.Button onClick={onClose}>마감</ModalContent.Button>
      </div>
    </ModalContent>
  )
}
