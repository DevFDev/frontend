import { SubmitHandler, useForm } from 'react-hook-form'

import { Meta, StoryObj } from '@storybook/react'

import { Form } from '@/components/shared/form'

const meta: Meta = {
  title: 'Shared/Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Form>

interface FormValues {
  email: string
  name: string
  password: string
  confirmPassword: string
  githubUrl: string
  agreements: string[]
}

const FormWrapper = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      agreements: [],
    },
  })

  const onSubmit: SubmitHandler<FormValues> = () => {}

  return (
    <div className='w-420'>
      <Form
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
        className='w-full'
      >
        <Form.Checkbox
          variant='checkbox'
          name='agreements'
          label='동의 항목'
          options={[
            { label: '만 14세 이상입니다 (필수)', value: 'age' },
            { label: '서비스 이용약관 동의 (필수)', value: 'terms' },
            { label: '개인정보 수집 및 이용 동의 (필수)', value: 'privacy' },
            {
              label: '이벤트 등 마케팅 정보 수신 동의 (선택)',
              value: 'marketing',
            },
          ]}
        />
        <Form.Checkbox
          variant='check'
          name='agreements'
          label='동의 항목'
          options={[
            { label: '만 14세 이상입니다 (필수)', value: 'age' },
            { label: '서비스 이용약관 동의 (필수)', value: 'terms' },
            { label: '개인정보 수집 및 이용 동의 (필수)', value: 'privacy' },
            {
              label: '이벤트 등 마케팅 정보 수신 동의 (선택)',
              value: 'marketing',
            },
          ]}
        />
      </Form>
    </div>
  )
}

export const Default: Story = {
  render: () => <FormWrapper />,
}
