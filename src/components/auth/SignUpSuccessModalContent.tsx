import { ModalContent } from '../shared/modalContents/ModalContent'
import celebrateImage from '/public/assets/images/img-celebration.png'

export const SignUpSuccessModalContent2 = (): JSX.Element => {
  return (
    <ModalContent>
      <ModalContent.Image src={celebrateImage} alt={'축하 이미지'} />
      <ModalContent.Header
        title={'회원가입 완료!'}
        subTitle={
          <>
            홍길동님의 회원가입이
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
      <ModalContent.Link href={'/'} label={'로그인 바로가기'} />
    </ModalContent>
  )
}
