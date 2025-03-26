import { ModalContent } from '@/components/shared/modalContent'

import { AddTeamMemberForm } from '../form/AddTeamMemberForm'

export const AddTeamMemberModalContent = (): JSX.Element => {
  return (
    <ModalContent>
      <ModalContent.Header
        title={'멤버 등록'}
        subTitle={'추가할 멤버의 닉네임을 작성해주세요!'}
      />
      <AddTeamMemberForm />
      <ModalContent.Button form='addTeamMember' type='submit'>
        등록
      </ModalContent.Button>
    </ModalContent>
  )
}
