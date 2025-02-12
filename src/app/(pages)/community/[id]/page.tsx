'use client'

import { useParams } from 'next/navigation'

import {
  IcBin,
  IcComment,
  IcEdit,
  IcEyeOpen,
  IcHeart,
  IcShare,
} from '@/assets/IconList'
import { CommunityDetail } from '@/types/api/Community.types'

import { Avatar } from '@/components/common/avatar'
import { Button, Clickable } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'
import { ContentViewer } from '@/components/shared/contentViewer'

const dummyCommunityDetail: CommunityDetail = {
  id: 1,
  writer: {
    id: 1,
    nickname: '개발왕김코딩',
    imageUrl: 'https://picsum.photos/200',
  },
  views: 128,
  answers: 5,
  likes: 23,
  createdAt: '2024-03-15T09:00:00Z',
  updatedAt: '2024-03-15T10:30:00Z',
  communityCategory: 'SKILL',
  communityTitle: 'React 커스텀 훅에서 타입 에러가 발생합니다.',
  communityContent: `<h2>문제 상황</h2>
<p>React 커스텀 훅을 만들면서 타입 에러가 발생했습니다. 아래 코드를 봐주시면 감사하겠습니다.</p>

<pre><code class="language-typescript">interface UseToggleProps {
  initialValue?: boolean
}

const useToggle = ({ initialValue = false }: UseToggleProps) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return {
    value,
    toggle,
  }
}
</code></pre>

<h2>에러 메시지</h2>
<p>TypeScript 에러가 발생합니다:</p>
<pre><code class="language-bash">Type '{ value: boolean; toggle: () => void; }' is missing the following properties from type 'UseToggleReturn': isOpen, onToggle ts(2739)</code></pre>

<h2>시도해본 것</h2>
<ul>
<li>return 타입을 명시적으로 지정해보았습니다</li>
<li>interface를 사용하여 반환 타입을 정의해보았습니다</li>
<li>제네릭을 사용해보았습니다</li>
</ul>

<h2>개발 환경</h2>
<ul>
<li>React 18.2.0</li>
<li>TypeScript 5.0.4</li>
<li>Next.js 13.4.1</li>
</ul>

<p>어떻게 해결할 수 있을까요? 도움 부탁드립니다! 🙏</p>`,
  isComment: true,
}

export default function CommunityDetailPage(): JSX.Element {
  const params = useParams<{ id: string }>()

  const { id } = params
  console.log(id)

  const data = dummyCommunityDetail
  const {
    communityTitle,
    communityContent,
    communityCategory,
    writer,
    views,
    answers,
    likes,
    createdAt,
    isComment,
  } = data

  const categoryMap = {
    SKILL: '기술',
    CAREER: '커리어',
    OTHER: '기타',
  }

  // HTML 파싱 옵션 설정

  return (
    <Container className='mx-auto my-80 flex flex-col gap-20'>
      <section className='flex w-full flex-col gap-12'>
        <div className='mb-20 flex gap-8'>
          <Avatar image={writer.imageUrl} size={60} />
          <div className='flex flex-col gap-4'>
            <Text.Title variant='title2' weight='700'>
              {writer.nickname}
            </Text.Title>
            <div className='flex gap-10'>
              <Text.Body variant='body2' color='gray500'>
                {createdAt}
              </Text.Body>
              <div className='flex items-center gap-4'>
                <IcEyeOpen width={16} height={16} />
                <Text.Caption variant='caption1' color='gray500'>
                  {views}
                </Text.Caption>
              </div>
              <div className='flex items-center gap-4'>
                <IcHeart width={16} height={16} />
                <Text.Caption variant='caption1' color='gray500'>
                  {likes}
                </Text.Caption>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-12'>
          <Chip label={categoryMap[communityCategory]} />
        </div>
        <div className='mb-20'>
          <Text.Heading variant='heading3' as='h3' weight='700'>
            {communityTitle}
          </Text.Heading>
        </div>
        <ContentViewer content={communityContent} />
        <div className='flex items-center gap-8'>
          {isComment && (
            <Clickable
              variant='outlined'
              size='lg'
              borderColor='gray'
              className='mr-auto'
            >
              <IcComment width={24} height={24} />
              <div className='flex w-30 items-center justify-center'>
                {answers}
              </div>
            </Clickable>
          )}
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcHeart width={24} height={24} />
            <div className='flex w-30 items-center justify-center'>{likes}</div>
          </Button>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcShare width={24} height={24} />
            공유
          </Button>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcEdit width={24} height={24} />
            수정
          </Button>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcBin width={24} height={24} />
            삭제
          </Button>
        </div>
      </section>
      <Divider isVertical={false} />
    </Container>
  )
}
