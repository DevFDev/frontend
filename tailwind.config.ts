import type { Config } from 'tailwindcss'

const colorPalette: Record<
  string,
  string | Record<string | number, string | Record<string, string>>
> = {
  common: {
    black: '#000',
    white: '#fff',
    transparent: 'transparent',
  },
  primary: {
    normal: '#3586ff',
    strong: '#1d69dc',
    transparent: '#3586ff14',
  },
  semantic: {
    positive: '#2bc352',
    negative: '#ff5841',
    caution: '#ffc32e',
    active: '#1e76fc',
  },
  gray: {
    100: '#f5f5f5',
    200: '#eee',
    300: '#ddd',
    400: '#bbb',
    500: '#aaa',
    600: '#808080',
    700: '#555',
    800: '#333',
    900: '#232323',
    950: '#13161C',
  },
  red: {
    100: '#ffebe7',
    300: '#ffb7a9',
    500: '#f75c46',
    800: '#b40000',
    900: '#740000',
  },
  orange: {
    100: '#fff3e0',
    300: '#ffcc80',
    500: '#ff9800',
    800: '#e65100',
    900: '#c54500',
  },
  yellow: {
    100: '#fffacd',
    300: '#fff176',
    500: '#ffd559',
    800: '#ffc519',
    900: '#ffbe00',
  },
  green: {
    100: '#f4fbf4',
    300: '#c8e6c9',
    500: '#4caf50',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  cyan: {
    100: '#defaf5',
    300: '#a4f8ee',
    500: '#4ed4d9',
    800: '#1dadc0',
    900: '#1588a5',
  },
  blue: {
    100: '#edf8ff',
    300: '#a1d4fd',
    500: '#65b5ff',
    800: '#0057be',
    900: '#004899',
  },
  purple: {
    100: '#f6ebff',
    300: '#dbbbfe',
    500: '#bd8bfc',
    800: '#893de7',
    900: '#5d13b7',
  },
  pink: {
    100: '#ffeaf0',
    300: '#ffb2cc',
    500: '#fa77a7',
    800: '#c82265',
    900: '#ad0951',
  },
}

const fontPalette: Record<
  string,
  [string, { lineHeight: string; letterSpacing: string }] | string
> = {
  heading1: ['40px', { lineHeight: '54px', letterSpacing: '-0.02em' }],
  heading2: ['28px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
  heading3: ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
  heading4: ['22px', { lineHeight: '30px', letterSpacing: '-0.02em' }],
  heading5: ['20px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
  title1: ['18px', { lineHeight: '26px', letterSpacing: '-0.02em' }],
  title2: ['16px', { lineHeight: '24px', letterSpacing: '-0.02em' }],
  body1: ['16px', { lineHeight: '24px', letterSpacing: '-0.02em' }],
  body2: ['15px', { lineHeight: '22px', letterSpacing: '-0.02em' }],
  body3: ['14px', { lineHeight: '20px', letterSpacing: '-0.02em' }],
  caption1: ['13px', { lineHeight: '18px', letterSpacing: '-0.02em' }],
  caption2: ['12px', { lineHeight: '16px', letterSpacing: '-0.02em' }],
  inherit: 'inherit',
}

const customShadow: Record<string, string> = {
  level1: '0px 2px 4px 0px #5C7D9E33',
  level2: '0px 6px 16px 0px #5C7D9E33',
  level3: '0px 8px 24px 0px #5C7D9E33',
  level4: '0px 16px 40px 0px #5C7D9E33',
  level5: '0px 25px 60px 0px #5C7D9E33',
}

const px0_20 = Array.from(Array(21)).reduce(
  (acc, _, i) => {
    acc[i] = `${i}px`
    return acc
  },
  {} as Record<number, string>
)

const px0_100 = Array.from(Array(101)).reduce(
  (acc, _, i) => {
    acc[i] = `${i}px`
    return acc
  },
  {} as Record<number, string>
)

const px0_1200 = Array.from(Array(1201)).reduce(
  (acc, _, i) => {
    acc[i] = `${i}px`
    return acc
  },
  {} as Record<number, string>
)

const config: Config = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: px0_100,
    },
    screens: {
      sm: { min: '320px', max: '767px' },
      md: { min: '768px', max: '1199px' },
      lg: { min: '1200px' },
    },
    borderWidth: px0_20,
    fontSize: fontPalette,
    minWidth: px0_1200,
    minHeight: px0_1200,
    spacing: px0_1200,
    colors: colorPalette,
    boxShadow: customShadow,
    fontFamily: {
      primary: ['Pretendard', 'sans-serif'],
    },
  },
  plugins: [],
}
export default config
