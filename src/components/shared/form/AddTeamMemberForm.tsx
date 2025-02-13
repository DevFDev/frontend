import { Controller, useForm } from 'react-hook-form'

import { Label } from '@/components/common/label'

import { MemberSelect } from '../select/MemberSelect'
import { Form } from './Form'

const mockMembers = [
  {
    id: 1,
    nickname: '망곰이',
    imageUrl: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  },
  {
    id: 2,
    nickname: '망곰쓰',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 3,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 4,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 5,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
  {
    id: 6,
    nickname: '망곰곰곰맨',
    imageUrl: 'https://avatars.githubusercontent.com/u/2345678?v=4',
  },
]
export const AddTeamMemberForm = (): JSX.Element => {
  const methods = useForm()
  const { handleSubmit, control, watch } = methods
  const values = watch()
  const onSubmit = (data: any) => console.log(data)

  return (
    <Form
      id='addTeamMember'
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      className='w-full'
    >
      <div className='flex flex-col gap-4'>
        <Label labelText='닉네임' />
        <Controller
          name={'nickname'}
          control={control}
          rules={{ required: '기술 스택을 선택해주세요.' }}
          render={({ field: { onChange } }) => (
            <MemberSelect
              members={[]}
              onSelect={value => onChange(value)}
              selectedMembers={values.nickname}
            />
          )}
        />
      </div>
    </Form>
  )
}
