import {
  IcFacebook,
  IcGithub,
  IcInsta,
  IcLink,
  IcNotion,
} from '@/assets/IconList'

export const LINK_ICON_MAP: Record<string, React.ReactElement> = {
  LINK: <IcLink width={24} height={24} />,
  FACEBOOK: <IcFacebook width={24} height={24} />,
  INSTAGRAM: <IcInsta width={24} height={24} />,
  GITHUB: <IcGithub width={24} height={24} />,
  NOTION: <IcNotion width={24} height={24} />,
}
