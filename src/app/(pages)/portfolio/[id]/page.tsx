'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import {
  IcBin,
  IcComment,
  IcEdit,
  IcEyeOpen,
  IcHeart,
  IcShare,
} from '@/assets/IconList'
import {
  awardTypeToLabelMap,
  linkValueToLabelMap,
  positionValueToLabelMap,
} from '@/constants/stateToLabelMaps'
import { LINK_ICON_MAP } from '@/constants/valueIconMap'
import { CreatePortfolioResponse } from '@/types/api/Portfolio.types'
import hljs from 'highlight.js'
import parse, { Element } from 'html-react-parser'

import { Avatar } from '@/components/common/avatar'
import { Button, Clickable } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'

import {
  calculatePeriod,
  calculateTotalCareerPeriod,
} from '@/utils/calculatePeriod'

interface PortfolioDetailPageProps {
  params: {
    id: string
  }
}

const dummyPortfolioDetail: CreatePortfolioResponse = {
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
  portTitle: '프론트엔드 개발자 포트폴리오',
  portPosition: 'FRONTEND',
  tags: ['React', 'TypeScript', '웹개발'],
  portImageUrl: 'https://picsum.photos/800/400',
  portContent: `
  <p>저는 사용자 경험(UX) 개선과 성능 최적화를 중심으로 웹과 모바일 개발에 매진해 온 개발자입니다.</p>
  <p>React, TypeScript 등 최신 기술 스택을 활용하여 문제를 해결하며, 데이터 기반 의사결정으로 효율성을 높이는 프로젝트를 수행해 왔습니다.</p>
  <p>항상 새로운 기술에 대한 열정을 가지고 학습하며, 개발자로서의 성장을 위해 끊임없이 노력하고 있습니다.</p>
  `,
  techStacks: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  links: [
    { type: 'LINK', url: 'https://example.com' },
    { type: 'GITHUB', url: 'https://github.com/example' },
    { type: 'NOTION', url: 'https://example.com' },
    { type: 'LINK', url: 'https://example.com' },
    { type: 'FACEBOOK', url: 'https://example.com' },
    { type: 'INSTAGRAM', url: 'https://example.com' },
  ],
  educations: [
    {
      level: '대학교',
      institutionName: '코딩대학교',
      major: '컴퓨터공학과',
      admissionDate: '2019. 03',
      graduationDate: '2023. 02',
      graduationStatus: '졸업',
      grade: 4.2,
      gradeScale: 4.5,
      isTransfer: true,
    },
  ],
  careers: [
    {
      companyName: '테크스타트업',
      position: '프론트엔드 개발자',
      startDate: '2023.03',
      isCurrent: true,
      level: '사원',
      description: `
      <h3>주요 업무</h3>
      <ul>
        <li>React와 TypeScript를 사용한 웹 애플리케이션 개발</li>
        <li>성능 최적화를 통한 페이지 로딩 속도 50% 개선</li>
        <li>컴포넌트 라이브러리 구축 및 문서화</li>
        <li>코드 리뷰 및 주니어 개발자 멘토링</li>
      </ul>`,
    },
    {
      companyName: '테크중소SI',
      position: '프론트엔드 개발자',
      startDate: '2020.03',
      endDate: '2021.03',
      isCurrent: false,
      level: '사원',
      description: `<ul>
        <li>React와 TypeScript를 사용한 웹 애플리케이션 개발</li>
        <li>성능 최적화를 통한 페이지 로딩 속도 50% 개선</li>
        <li>컴포넌트 라이브러리 구축 및 문서화</li>
        <li>코드 리뷰 및 주니어 개발자 멘토링</li>
      </ul>`,
    },
  ],
  awards: [
    {
      awardType: 'COMPETITION',
      competitionName: '대학생 소프트웨어 경진대회',
      hostingInstitution: '정보통신산업진흥원',
      competitionDate: '2022.03',
    },
    {
      awardType: 'ACTIVITY',
      activityName: '대학생 해커톤 동아리',
      startDate: '2022.03',
      endDate: '2023.03',
    },
    {
      awardType: 'CERTIFICATE',
      certificateName: '정보처리기사',
      issuer: '한국산업인력공단',
      passingDate: '2022.03',
    },
    {
      awardType: 'LANGUAGE',
      language: '영어',
      testName: 'TOEIC',
      score: '900',
      obtainedDate: '2022.03',
    },
  ],
}

export default function PortfolioDetailPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const { id } = params
  console.log(id)
  const data = dummyPortfolioDetail
  const {
    writer,
    views,
    likes,
    createdAt,
    portImageUrl,
    portTitle,
    portContent,
    portPosition,
    tags,
    techStacks,
    links,
    educations,
    careers,
    awards,
    answers,
  } = data
  const options = {
    replace: domNode => {
      if (
        domNode instanceof Element &&
        domNode.name === 'code' &&
        domNode.attribs.class
      ) {
        const language = domNode.attribs.class.replace('language-', '')
        try {
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
          return domNode
        }
      }
    },
  }

  return (
    <Container className='mx-auto my-80 flex flex-col gap-20'>
      <section className='flex w-full flex-col gap-20'>
        <div className='flex gap-8'>
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
        <div>
          <div className='mb-12 flex gap-10'>
            {portPosition && (
              <Chip
                type='position'
                label={positionValueToLabelMap[portPosition]}
              />
            )}
          </div>
          <Text.Heading variant='heading3' as='h3' weight='700'>
            {portTitle}
          </Text.Heading>
        </div>
        {links && links.length > 0 && (
          <section>
            <header className='h-50 border-y-1 border-solid border-gray-200 bg-gray-100 px-20 py-12'>
              <Text.Title variant='title1' weight='700'>
                링크
              </Text.Title>
            </header>
            <ul>
              {links.map((link, index) => (
                <li
                  key={index}
                  className='flex items-center gap-24 border-b-1 border-solid border-gray-200 p-20'
                >
                  <div className='flex w-160 items-center gap-4'>
                    {LINK_ICON_MAP[link.type as LinkType]}
                    <Text.Body variant='body2'>
                      {linkValueToLabelMap[link.type as LinkType]}
                    </Text.Body>
                  </div>
                  <Link href={link.url || ''} target='_blank'>
                    <Text.Title variant='title2' weight='700'>
                      {link.url}
                    </Text.Title>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {educations && educations.length > 0 && (
          <section>
            <header className='h-50 border-y-1 border-solid border-gray-200 bg-gray-100 px-20 py-12'>
              <Text.Title variant='title1' weight='700'>
                학력
              </Text.Title>
            </header>
            <ul>
              {educations.map((edu, index) => (
                <li
                  key={index}
                  className='flex items-center gap-24 border-b-1 border-solid border-gray-200 p-20'
                >
                  <div className='flex w-160 flex-col gap-4'>
                    <Text.Body variant='body2'>
                      {`${edu.admissionDate} ~ ${edu.graduationDate}`}
                    </Text.Body>
                    <Text.Body variant='body3' color='gray600'>
                      {`${edu.level} ${edu.graduationStatus}`}
                    </Text.Body>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-12'>
                      <Text.Title variant='title2' weight='700'>
                        {edu.institutionName}
                        {edu.isTransfer && '(편입)'}
                      </Text.Title>
                      <Text.Body variant='body3' color='gray600'>
                        {edu.major}
                      </Text.Body>
                    </div>
                    <Text.Body variant='body3' color='gray600'>
                      {edu.grade}/{edu.gradeScale}
                    </Text.Body>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {techStacks && techStacks.length > 0 && (
          <section>
            <header className='h-50 border-y-1 border-solid border-gray-200 bg-gray-100 px-20 py-12'>
              <Text.Title variant='title1' weight='700'>
                기술 스택
              </Text.Title>
            </header>
            <ul className='flex items-center gap-4 border-b-1 border-solid border-gray-200 p-20'>
              {techStacks.map((tech, index) => (
                <li key={index}>
                  <Chip type='techStack' label={tech} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {awards && awards.length > 0 && (
          <section>
            <header className='h-50 border-y-1 border-solid border-gray-200 bg-gray-100 px-20 py-12'>
              <Text.Title variant='title1' weight='700'>
                수상 및 기타
              </Text.Title>
            </header>
            <ul>
              {awards.map((award, index) => (
                <li
                  key={index}
                  className='flex items-center gap-24 border-b-1 border-solid border-gray-200 p-20'
                >
                  <div className='flex w-160 flex-col gap-4'>
                    <Text.Body variant='body2'>
                      {award.awardType === 'ACTIVITY' &&
                        `${award.startDate} ~ ${award.endDate}`}
                      {award.awardType === 'CERTIFICATE' && award.passingDate}
                      {award.awardType === 'COMPETITION' &&
                        award.competitionDate}
                      {award.awardType === 'LANGUAGE' && award.obtainedDate}
                    </Text.Body>
                    <Text.Body variant='body3' color='gray600'>
                      {awardTypeToLabelMap[award.awardType]}
                    </Text.Body>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-12'>
                      <Text.Title variant='title2' weight='700'>
                        {award.awardType === 'ACTIVITY' && award.activityName}
                        {award.awardType === 'CERTIFICATE' &&
                          award.certificateName}
                        {award.awardType === 'COMPETITION' &&
                          award.competitionName}
                        {award.awardType === 'LANGUAGE' &&
                          `${award.language} ${award.testName}`}
                      </Text.Title>
                      <Text.Body variant='body3' color='gray600'>
                        {award.awardType === 'CERTIFICATE' && award.issuer}
                        {award.awardType === 'COMPETITION' &&
                          award.hostingInstitution}
                        {award.awardType === 'LANGUAGE' && award.score}
                      </Text.Body>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
        {careers && careers.length > 0 && (
          <section>
            <header className='h-50 border-y-1 border-solid border-gray-200 bg-gray-100 px-20 py-12'>
              <div className='flex items-center gap-12'>
                <Text.Title variant='title1' weight='700'>
                  경력
                </Text.Title>
                {careers && careers.length > 0 && (
                  <Text.Body variant='body3' color='highlight'>
                    {`(총 ${calculateTotalCareerPeriod(careers)})`}
                  </Text.Body>
                )}
              </div>
            </header>
            <ul>
              {careers.map((career, index) => (
                <li
                  key={index}
                  className='flex gap-24 border-b-1 border-solid border-gray-200 p-20'
                >
                  <div className='flex w-160 flex-col gap-4'>
                    <Text.Body variant='body2'>
                      {`${career.startDate} ~ ${career.isCurrent ? '현재' : career.endDate}`}
                    </Text.Body>
                    <Text.Body variant='body3' color='gray600'>
                      {career.isCurrent
                        ? '재직중'
                        : calculatePeriod(
                            career.startDate as string,
                            career.endDate as string
                          )}
                    </Text.Body>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-12'>
                      <Text.Title variant='title2' weight='700'>
                        {career.companyName}
                      </Text.Title>
                      <Text.Body variant='body3' color='gray600'>
                        {career.position}
                        {career.level && ` · ${career.level}`}
                      </Text.Body>
                    </div>
                    {career.description && (
                      <div className='tiptap'>
                        {parse(career.description, options)}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className='relative mb-20 h-400 w-full overflow-hidden rounded-16'>
          <Image
            src={portImageUrl}
            alt={portTitle}
            fill
            className='object-cover'
          />
        </div>
        <div className='tiptap mb-20'>{parse(portContent, options)}</div>
        <div className='mb-12 flex gap-10'>
          {tags.map(tag => (
            <Chip key={tag} label={`#${tag}`} />
          ))}
        </div>
        <div className='flex items-center gap-8'>
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
