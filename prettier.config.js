module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindConfig: '/tailwind.config.ts',
  tailwindFunctions: ['clsx', 'twMerge'],
  importOrder: [
    '^react(.*)$',           // React 관련 import를 최상단으로
    '<THIRD_PARTY_MODULES>', // 외부 모듈
    '^@/app/api/(.*)$',      // api 폴더
    '^@/components/(.*)$',   // components 폴더를
    '^@/queries/(.*)$',        // hooks 폴더
    '^@/hooks/(.*)$',        // hooks 폴더
    '^@/services/(.*)$',     // services 폴더
    '^@/utils/(.*)$',        // utils 폴더
    '^[./]',                 // 상대 경로
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

