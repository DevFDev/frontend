import clsx from 'clsx'

type Variant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'title1'
  | 'title2'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption1'
  | 'caption2'
type Color =
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
  | 'highlight'
  | 'positive'
  | 'negative'
  | 'caution'
  | 'active'
type As = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type FontWeight = '400' | '500' | '600' | '700'

interface TextBaseProps {
  as?: As
  variant: Variant
  color?: Color
  weight?: FontWeight
  children: React.ReactNode
  className?: string
}

const styleByVariant: Record<Variant, string> = {
  heading1: 'text-heading1',
  heading2: 'text-heading2',
  heading3: 'text-heading3',
  heading4: 'text-heading4',
  heading5: 'text-heading5',
  title1: 'text-title1',
  title2: 'text-title2',
  body1: 'text-body1',
  body2: 'text-body2',
  body3: 'text-body3',
  caption1: 'text-caption1',
  caption2: 'text-caption2',
}

const styleByColor: Record<Color, string> = {
  gray400: 'text-gray-400',
  gray500: 'text-gray-500',
  gray600: 'text-gray-600',
  gray700: 'text-gray-700',
  gray800: 'text-gray-800',
  highlight: 'text-primary-normal',
  positive: 'text-semantic-positive',
  negative: 'text-semantic-negative',
  caution: 'text-semantic-caution',
  active: 'text-semantic-active',
}

const styleByWeight: Record<FontWeight, string> = {
  '400': 'font-normal',
  '500': 'font-medium',
  '600': 'font-semibold',
  '700': 'font-bold',
}

const TextBase = ({
  as: Component = 'div',
  variant,
  color = 'gray800',
  weight = '500',
  children,
  className = '',
}: TextBaseProps): JSX.Element => {
  const variantStyle = styleByVariant[variant]
  const colorStyle = styleByColor[color]
  const weightStyle = styleByWeight[weight]

  const textStyle = clsx(variantStyle, colorStyle, weightStyle, className)
  return <Component className={textStyle}>{children}</Component>
}

interface HeadingProps extends TextBaseProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  variant: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5'
}

const Heading = ({
  as,
  variant,
  color = 'gray800',
  weight = '700',
  children,
  ...props
}: HeadingProps) => (
  <TextBase as={as} variant={variant} color={color} weight={weight} {...props}>
    {children}
  </TextBase>
)

interface TitleProps extends TextBaseProps {
  as?: 'h4' | 'h5' | 'div' | 'p'
  variant: 'title1' | 'title2'
}

const Title = ({ children, as = 'h4', ...props }: TitleProps) => (
  <TextBase {...props} as={as}>
    {children}
  </TextBase>
)

interface BodyProps extends TextBaseProps {
  as?: 'div' | 'p'
  variant: 'body1' | 'body2' | 'body3'
}

const Body = ({ children, as = 'p', ...props }: BodyProps) => (
  <TextBase {...props} as={as}>
    {children}
  </TextBase>
)

interface CaptionProps extends TextBaseProps {
  as?: 'div' | 'span'
  variant: 'caption1' | 'caption2'
}

const Caption = ({ children, as = 'span', ...props }: CaptionProps) => (
  <TextBase {...props} as={as}>
    {children}
  </TextBase>
)

interface CompoundTextProps extends TextBaseProps {
  Heading: typeof Heading
  Title: typeof Title
  Body: typeof Body
  Caption: typeof Caption
}

const Text = {} as CompoundTextProps

Text.Heading = Heading
Text.Title = Title
Text.Body = Body
Text.Caption = Caption

export { Text }
