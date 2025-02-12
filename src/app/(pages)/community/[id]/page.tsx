'use client'

import { useParams } from 'next/navigation'

import { useState } from 'react'

import {
  IcAnswerBlue,
  IcBin,
  IcComment,
  IcEdit,
  IcEyeOpen,
  IcHeart,
  IcPencil,
  IcPeopleMinus,
  IcPeoplePlus,
  IcSearch,
  IcShare,
} from '@/assets/IconList'
import { recruitmentStatusMap } from '@/constants/stateToLabelMaps'
import { cn } from '@/lib/utils'
import { CommunityDetail } from '@/types/api/Community.types'
import { TeamRecruitmentListItem, TeamType } from '@/types/api/Team.types'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Highlight as TiptapHighlight } from '@tiptap/extension-highlight'
import SubScript from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import hljs from 'highlight.js'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'
import parse, { Element } from 'html-react-parser'
import { all, createLowlight } from 'lowlight'

import { Avatar } from '@/components/common/avatar'
import { Button, Clickable } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Box, Container, Grid } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { TextInput } from '@/components/common/input'
import { Switch } from '@/components/common/switch/Switch'
import { Highlight, Text } from '@/components/common/text'
import { Pagination } from '@/components/shared/pagination'
import { Select } from '@/components/shared/select'
import { CareerSelect } from '@/components/shared/select/CareerSelect'
import { TeamRecruitmentCard } from '@/components/team/TeamRecruitmentCard'

import { usePagination } from '@/hooks/usePagination'
import { useToggle } from '@/hooks/useToggle'

const stackOptions = [
  { label: '자바스크립트', value: 'Javascript' },
  { label: 'Css', value: 'Css' },
  { label: 'HTML', value: 'HTML' },
  { label: '타입스크립트', value: 'Typescript' },
]
const positionOptions = [
  { label: '프론트엔드', value: 'frontend' },
  { label: '백엔드', value: 'backend' },
  { label: '풀스택', value: 'fullstack' },
]

const teamTypeMap: Record<TeamType, string> = {
  STUDY: '스터디',
  MENTORING: '멘토링',
  PROJECT: '프로젝트',
}

interface CommunityDetailPageProps {
  params: {
    id: string
  }
}

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

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)

// Register specific languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('json', json)
lowlight.register('bash', bash)

export default function CommunityDetailPage(): JSX.Element {
  const params = useParams<{ id: string }>()

  const { id } = params
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
  const options = {
    replace: domNode => {
      if (
        domNode instanceof Element &&
        domNode.name === 'code' &&
        domNode.attribs.class
      ) {
        // language-xxx 형식에서 언어 추출
        const language = domNode.attribs.class.replace('language-', '')
        try {
          // 코드 내용 하이라이팅
          const highlightedCode = hljs.highlight(
            domNode.children[0].data || '',
            { language }
          ).value

          return (
            <code
              className={domNode.attribs.class}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )
        } catch (e) {
          // 하이라이팅 실패 시 원본 반환
          return domNode
        }
      }
    },
  }

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
        <div className='tiptap mb-20'>{parse(communityContent, options)}</div>
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

// ...
