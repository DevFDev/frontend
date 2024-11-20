import NextLink from 'next/link'

import { IcCodefile, IcLogout, IcSetting, IcWorkbag } from '@/assets/IconList'

import { Avatar } from '@/components/common/avatar'
import { Dropdown } from '@/components/common/dropdown'
import { Highlight, Text } from '@/components/common/text'

type Image = string

interface UserMenuProps {
  user: {
    id: Id
    name: Name
    image: Image
  }
}

type Option = {
  label: string
  link: string
  icon: React.ReactElement
}

const linkOptions: Option[] = [
  {
    label: '포트폴리오 관리',
    link: '/portfolio',
    icon: <IcWorkbag />,
  },
  {
    label: '나의 프로젝트',
    link: '/project',
    icon: <IcCodefile />,
  },
  {
    label: '설정',
    link: '/setting',
    icon: <IcSetting />,
  },
]

const itemClass = 'h-48 w-full gap-8'

export const HeaderUserMenu = ({
  user: { image, name },
}: UserMenuProps): JSX.Element => {
  const handleLogout = async () => {
    console.log('로그아웃')
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <UserMenuTrigger image={image} />
      </Dropdown.Trigger>
      <Dropdown.Menu alignment={'right'} className={'justify-start p-0'}>
        <UserMenuHeader image={image} name={name} />
        <hr className='w-full text-gray-200' />
        <div className={'w-full p-16'}>
          {linkOptions.map(option => (
            <NextLink key={option.label} href={option.link}>
              <Dropdown.Item className={itemClass}>
                {option.icon}
                {option.label}
              </Dropdown.Item>
            </NextLink>
          ))}
          <Dropdown.Item className={itemClass} onClick={handleLogout}>
            <Highlight className='flex items-center gap-8 text-gray-500'>
              <IcLogout />
              {'로그아웃'}
            </Highlight>
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const UserMenuTrigger = ({ image }: { image: Image }) => (
  <div className={'flex items-center gap-12'}>
    <Text.Body variant={'body2'} className={'font-medium'}>
      환영합니다!
    </Text.Body>
    <Avatar image={image} size={48} />
  </div>
)

const UserMenuHeader = ({ image, name }: { image: Image; name: Name }) => (
  <div className={'flex items-center gap-12 p-16'}>
    <Avatar image={image} size={48} />
    <div>
      <h4 className={'text-body2 font-medium text-gray-800'}>{name}</h4>
      <NextLink href={'/mypage'} className={'text-body3'}>
        <Highlight>마이페이지</Highlight>
      </NextLink>
    </div>
  </div>
)
