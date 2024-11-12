import Image from 'next/image'

import { IcAvatar } from '@/assets/IconList'
import clsx from 'clsx'

type AvatarSize = 24 | 48 | 60 | 180

interface AvatarProps {
  image?: string | null
  size?: AvatarSize
  alt?: string
  className?: string
}

const baseStyle =
  'relative flex items-center justify-center overflow-hidden rounded-full bg-gray-200'

const styleBySize: Record<AvatarSize, string> = {
  24: 'w-24 h-24',
  48: 'w-44 h-44',
  60: 'w-60 h-60',
  180: 'w-180 h-180',
}

export const Avatar = ({
  image = null,
  size = 48,
  alt = 'username',
  className = '',
}: AvatarProps): JSX.Element => {
  const avatarStyle = clsx(baseStyle, styleBySize[size], className)

  return (
    <div className={avatarStyle} role='img'>
      {image ? (
        <Image
          src={image}
          alt={`${alt} 아바타`}
          fill
          className='object-cover'
        />
      ) : (
        <IcAvatar />
      )}
    </div>
  )
}
