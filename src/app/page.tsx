import Image from 'next/image'
import NextLink from 'next/link'

import { IcArrowRight, IcChevronRight, IcStar } from '@/assets/IconList'

import { Link } from '@/components/common/button'
import { Chip } from '@/components/common/chip'
import { Box, Container, Grid } from '@/components/common/containers'
import { Logo } from '@/components/common/logo'
import { Highlight, Text } from '@/components/common/text'

import mainBannerImage from '/public/assets/images/img-main.png'
import matrixImage from '/public/assets/images/img-matrix.png'
import emptyPortfolioImage from '/public/assets/images/img-portfolio-empty.png'

export default function Home(): JSX.Element {
  return (
    <Container className='mx-auto flex flex-col gap-80 py-80'>
      <Box
        variant='contained'
        padding={0}
        className='flex-row justify-between bg-gray-950'
      >
        <div className='py-40 pl-60 pr-30'>
          <div className='mb-10'>
            <Logo variant='primary' />
          </div>
          <div>
            <Text.Heading variant='heading1' as='h2' color='white' weight='700'>
              예비 개발자들을 위한
              <br />
              자료 공유 & 커뮤니티 사이트
            </Text.Heading>
          </div>
          <div className='mb-40'>
            <Text.Heading variant='heading5' as='h5' color='white' weight='400'>
              다른 개발자들과 프로젝트를 공유하고 피드백해보세요!
              <br />
              많은 정보를 나누며 발전할 수있어요!
            </Text.Heading>
          </div>
          <Link href={'/projects'} className='px-24 font-bold' size='xl'>
            프로젝트 보러가기
            <IcArrowRight width={24} height={24} />
          </Link>
        </div>
        <div className=''>
          <Image src={mainBannerImage} height={400} alt='main banner img' />
        </div>
      </Box>
      <div className='flex flex-col gap-20'>
        <Text.Heading variant='heading3' as='h3' weight='700'>
          나의 작품 공유
        </Text.Heading>
        <Box variant='contained' color='secondary' className='gap-12 py-40'>
          <Image
            src={emptyPortfolioImage}
            width={100}
            height={100}
            alt='포트폴리오 공백'
          />
          <Text.Body
            variant='body1'
            as='p'
            color='gray500'
            className='text-center'
          >
            나의 포트폴리오와 프로젝트를 공유하고
            <br />
            다른 사람들의 피드백을 받아 보세요!
          </Text.Body>
          <Link
            href={'/mypage'}
            variant='outlined'
            className='bg-transparent font-semibold'
            size='lg'
          >
            공유하기
          </Link>
        </Box>
      </div>
      <div className='flex flex-col gap-20'>
        <div className='flex items-end justify-between'>
          <div>
            <Text.Body
              variant='body1'
              as='p'
              weight='600'
              color='highlight'
              className='mb-4'
            >
              우리가 새롭게 만든 거 구경해보세요!
            </Text.Body>
            <Text.Heading variant='heading3' as='h3' weight='700'>
              주니어 개발자의 프로젝트
            </Text.Heading>
          </div>
          <Link href='/' variant='text' className='h-24 p-0'>
            전체 보기
            <IcChevronRight width={24} height={24} />
          </Link>
        </div>
        <Grid.Container columns={5} spacing={30}>
          {PROJECTS.map(project => (
            <Grid.Item colSpan={1} key={project.id}>
              <div className='flex h-260 w-216 flex-col gap-8 overflow-hidden rounded-12'>
                <div className='h-140 rounded-12 bg-gray-500'></div>
                <div className='flex flex-col gap-4'>
                  <Chip label={project.chipLabel} />
                  <NextLink href={'/'}>
                    <Text.Title variant='title1' weight='700'>
                      {project.title}
                    </Text.Title>
                  </NextLink>
                  <div className='flex items-center gap-4'>
                    <IcStar width={24} height={24} />
                    <Text.Body variant='body2'>{project.rate}</Text.Body>
                  </div>
                </div>
                <Text.Caption variant='caption1' color='gray700'>
                  {project.author}
                </Text.Caption>
              </div>
            </Grid.Item>
          ))}
        </Grid.Container>
      </div>
      <div className='flex flex-col gap-20'>
        <div className='flex items-end justify-between'>
          <div>
            <Text.Body
              variant='body1'
              as='p'
              weight='600'
              color='highlight'
              className='mb-4'
            >
              채용도 DFD와 시작하기
            </Text.Body>
            <Text.Heading variant='heading3' as='h3' weight='700'>
              실시간 가장 HOT한 공고
            </Text.Heading>
          </div>
          <Link href='/' variant='text' className='h-24 p-0'>
            전체 보기
            <IcChevronRight width={24} height={24} />
          </Link>
        </div>
        <Grid.Container columns={5} spacing={30}>
          <Grid.Item colSpan={2}>
            <div className='relative h-258 w-462 overflow-hidden rounded-12'>
              <Image
                className='z-[-1]'
                fill
                src={matrixImage}
                alt='matrix background'
              />
              <div className='z-10 flex w-full flex-col gap-12 p-32'>
                <Text.Heading
                  variant='heading3'
                  as='h3'
                  weight='700'
                  color='white'
                >
                  <Highlight>개발자 취업</Highlight> 어디서부터
                  <br />
                  어떻게 해야할지 막막하다구요?!
                </Text.Heading>
                <Text.Heading
                  variant='heading5'
                  as='h5'
                  weight='400'
                  color='white'
                >
                  DFD에서 준비부터 취업까지!
                  <br />
                  실패하지 않는 취업 꿀팁을 확인해보세요.
                </Text.Heading>
                <Link href='/'>
                  보러가기
                  <IcArrowRight width={24} height={24} />
                </Link>
              </div>
            </div>
          </Grid.Item>
          {OPENINGS.map(opening => (
            <Grid.Item colSpan={1} key={opening.id}>
              <NextLink href={'/'}>
                <Box className='h-260 w-216 items-start justify-start gap-8 overflow-hidden rounded-12'>
                  <div className='h-140 w-full rounded-t-12 bg-gray-500'></div>
                  <div className='flex w-full flex-col gap-8 p-12'>
                    <div className='flex items-center gap-10'>
                      <div className='h-32 w-32 rounded-full border-1 border-solid border-gray-200'></div>
                      <Text.Body variant='body3' color='gray500'>
                        {opening.company}
                      </Text.Body>
                    </div>
                    <Text.Title
                      variant='title1'
                      weight='700'
                      className='overflow-hidden overflow-ellipsis whitespace-nowrap'
                    >
                      {opening.title}
                    </Text.Title>
                    <Text.Body variant='body3' color='gray500'>
                      {opening.desc}
                    </Text.Body>
                  </div>
                </Box>
              </NextLink>
            </Grid.Item>
          ))}
        </Grid.Container>
      </div>
    </Container>
  )
}

const PROJECTS = [
  {
    title: '개발자 커뮤니티 사이트',
    chipLabel: 'Project Subject',
    rate: '5.0',
    author: 'Gildong',
    id: 1,
  },
  {
    title: '개발자 커뮤니티 사이트',
    chipLabel: 'Project Subject',
    rate: '5.0',
    author: 'HongGildong',
    id: 2,
  },
  {
    title: 'Title',
    chipLabel: 'Project Subject',
    rate: '3.9',
    author: 'Gildong',
    id: 3,
  },
  {
    title: 'Title',
    chipLabel: 'Project Subject',
    rate: '4.1',
    author: '항상졸려요',
    id: 4,
  },
  {
    title: '개발자 Title 사이트',
    chipLabel: 'Project Subject',
    rate: '5.0',
    author: '나는백엔드개발자라네',
    id: 5,
  },
]

const OPENINGS = [
  {
    company: '넥슨코리아(NEXON)',
    chipLabel: 'Project Subject',
    title: '[인텔리전스랩스] 백엔드 어쩌구 저쩌구',
    desc: '경기 성남시 ∙ 경력 1년 이상',
    id: 1,
  },
  {
    company: '개발자 커뮤니티 사이트',
    chipLabel: 'Project Subject',
    title: '[인텔리전스랩스] 백엔드 어쩌구 저쩌구',
    desc: '경기 성남시 ∙ 경력 1년 이상',
    id: 2,
  },
  {
    company: 'Title',
    chipLabel: 'Project Subject',
    title: '[인텔리전스랩스] 백엔드 어쩌구 저쩌구',
    desc: '경기 성남시 ∙ 경력 1년 이상',
    id: 3,
  },
]
