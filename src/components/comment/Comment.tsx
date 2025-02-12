import { SubmitHandler, useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { Form } from '@/components/shared/form'

import { Button } from '../common/button'

interface CommentProps {
  variant: 'comment' | 'reply'
  size: 'sm' | 'lg'
  className?: string
}

interface CommentFormValue {
  comment: string
}

export const Comment = ({
  variant = 'comment',
  size = 'lg',
  className,
}: CommentProps): JSX.Element => {
  const placeholder =
    variant === 'comment' ? '댓글을 입력해보세요!' : '답글을 입력해보세요!'
  const commentStyle = cn(
    cn(
      {
        'w-1080': size === 'lg',
        'w-1000': size === 'sm',
      },
      className
    )
  )

  const methods = useForm<CommentFormValue>({
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit: SubmitHandler<CommentFormValue> = data => {
    // TODO: 댓글 데이터를 서버로 전송하는 로직 추가
    console.log('댓글 내용 콘솔 테스트', data)
  }

  return (
    <Form
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
      className='flex gap-x-8'
    >
      <Form.TextArea
        name='comment'
        size='lg'
        placeholder={placeholder}
        className={commentStyle}
      />
      <div className='flex items-end'>
        <Button
          type='submit'
          backgroundColor='transparentBlue'
          textColor='blue'
          size='sm'
        >
          등록
        </Button>
      </div>
    </Form>
  )
}
