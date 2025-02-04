import { useRouter } from 'next/navigation'

import { ModalContent } from '@/components/shared/modalContent'

import useModalStore from '@/stores/useModalStore'

import celebrateImage from '/public/assets/images/img-celebration.png'

interface SignUpSuccessModalContentProps {
  userName: string
}

export const SignUpSuccessModalContent = ({
  userName,
}: SignUpSuccessModalContentProps): JSX.Element => {
  const closeModal = useModalStore(state => state.closeModal)
  const router = useRouter()
  return (
    <ModalContent>
      <ModalContent.Image src={celebrateImage} alt={'축하 이미지'} />
      <ModalContent.Header
        title={'회원가입 완료!'}
        subTitle={
          <>
            {userName}님의 회원가입이
            <br />
            성공적으로 완료되었습니다.
          </>
        }
      />
      <ModalContent.InfoBox
        firstLabel={'나의 정보 확인 및 수정은 '}
        linkLabel={'마이페이지 > 프로필'}
        lastLabel={'에서 가능합니다.'}
        to={'/'}
      />

      <ModalContent.Button
        onClick={() => {
          router.push('/login')
          closeModal()
        }}
      >
        로그인 바로가기
      </ModalContent.Button>
    </ModalContent>
  )
}
