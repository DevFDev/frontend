import Image, { StaticImageData } from 'next/image'
import NextLink from 'next/link'

import {
  Button,
  ButtonProps,
  Link,
  LinkProps,
} from '@/components/common/button'
import { Box } from '@/components/common/containers'
import { Highlight, Text } from '@/components/common/text'

import useModalStore from '@/stores/useModalStore'

export const ModalContent = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  return (
    <div className={'flex flex-col items-center gap-20 text-center'}>
      {children}
    </div>
  )
}

interface ModalImageProps {
  src: StaticImageData
  alt: string
}

const ModalImage = ({ src, alt }: ModalImageProps) => {
  return (
    <div className={'relative h-100 w-100'}>
      <Image src={src} alt={alt} fill className='object-cover' />
    </div>
  )
}

interface ModalHeaderProps {
  title: string
  subTitle?: React.ReactNode
}

const ModalHeader = ({ title, subTitle }: ModalHeaderProps) => {
  return (
    <div className={'flex flex-col gap-8'}>
      <Text.Heading as={'h2'} variant={'heading4'} color={'gray800'}>
        {title}
      </Text.Heading>
      {subTitle && (
        <Text.Body variant={'body1'} color={'gray600'}>
          {subTitle}
        </Text.Body>
      )}
    </div>
  )
}

interface ModalInfoBoxProps {
  firstLabel: string
  lastLabel: string
  linkLabel?: string
  to?: string
}

const ModalInfoBox = ({
  firstLabel,
  lastLabel,
  linkLabel,
  to,
}: ModalInfoBoxProps) => {
  const { closeModal } = useModalStore()

  return (
    <Box variant={'contained'} color={'secondary'} className={'px-12 py-8'}>
      <Text.Body variant={'body3'} color={'gray600'}>
        *{firstLabel}
        {to && (
          <NextLink href={to} onClick={closeModal}>
            <Highlight>{linkLabel}</Highlight>
          </NextLink>
        )}
        {lastLabel}
      </Text.Body>
    </Box>
  )
}

const ModalButton = ({
  onClick = () => {},
  ...props
}: ButtonProps): JSX.Element => {
  const { closeModal } = useModalStore()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e)
    closeModal()
  }

  return (
    <Button
      onClick={handleClick}
      size={'lg'}
      className={'text-title2'}
      fullWidth
      {...props}
    />
  )
}

const ModalLink = ({
  onClick = () => {},
  ...props
}: LinkProps): JSX.Element => {
  const { closeModal } = useModalStore()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick(e)
    closeModal()
  }

  return (
    <Link
      onClick={handleClick}
      size={'lg'}
      className={'text-title2'}
      fullWidth
      {...props}
    />
  )
}

ModalContent.Image = ModalImage
ModalContent.Header = ModalHeader
ModalContent.InfoBox = ModalInfoBox
ModalContent.Button = ModalButton
ModalContent.Link = ModalLink
