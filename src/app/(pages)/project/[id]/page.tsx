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
  linkValueToLabelMap,
  projectCategoryValueToLabelMap,
} from '@/constants/stateToLabelMaps'
import { LINK_ICON_MAP } from '@/constants/valueIconMap'
import {
  CreateProjectResponse,
  GetProjectDetailResponse,
} from '@/types/api/Project.types'

import { Avatar } from '@/components/common/avatar'
import { Button, Clickable } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Container } from '@/components/common/containers'
import { Divider } from '@/components/common/divider'
import { Text } from '@/components/common/text'
import { ContentViewer } from '@/components/shared/contentViewer'

import { useProject } from '@/queries/project'

export default function PortfolioDetailPage(): JSX.Element {
  const params = useParams<{ id: string }>()
  const projectId = Number(params.id)

  const { data: projectDetail, isLoading, isError } = useProject(projectId)

  const isOwnPost = !!(projectId % 2)
  // const { openModal } = useModalStore()

  // const { mutate: deleteCommunity } = useDeleteCommunity(communityId)

  if (isLoading) return <div>d</div>
  if (isError) return <div>d</div>

  const {
    writer,
    createdAt,
    projectImageUrl,
    projectTitle,
    projectContent,
    projectCategory,
    links,
    tags,
  } = projectDetail as GetProjectDetailResponse

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
                  {1}
                </Text.Caption>
              </div>
              <div className='flex items-center gap-4'>
                <IcHeart width={16} height={16} />
                <Text.Caption variant='caption1' color='gray500'>
                  {1}
                </Text.Caption>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='mb-12 flex gap-10'>
            {projectCategory && (
              <Chip
                type='position'
                label={projectCategoryValueToLabelMap[projectCategory]}
              />
            )}
          </div>
          <Text.Heading variant='heading3' as='h3' weight='700'>
            {projectTitle}
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
        <div className='relative mb-20 h-400 w-full overflow-hidden rounded-16'>
          <Image
            src={projectImageUrl as string}
            alt={projectTitle}
            fill
            className='object-cover'
          />
        </div>
        <ContentViewer content={projectContent} />
        <div className='mb-12 flex gap-10'>
          {tags?.map(tag => <Chip key={tag} label={`#${tag}`} />)}
        </div>
        <div className='flex items-center gap-8'>
          <Clickable
            variant='outlined'
            size='lg'
            borderColor='gray'
            className='mr-auto'
          >
            <IcComment width={24} height={24} />
            <div className='flex w-30 items-center justify-center'>{1}</div>
          </Clickable>
          <Button
            variant='outlined'
            size='lg'
            borderColor='gray'
            textColor='gray800'
          >
            <IcHeart width={24} height={24} />
            <div className='flex w-30 items-center justify-center'>{1}</div>
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
