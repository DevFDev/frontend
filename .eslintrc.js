module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'jsx-a11y', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Prettier 포맷팅 규칙을 ESLint에서 오류로 처리하여 포맷팅을 강제
    'react/react-in-jsx-scope': 'off', // Next.js에서는 React를 항상 import하지 않아도 되므로 비활성화
    'import/prefer-default-export': 'off', // 하나의 export만 있는 경우에도 named export를 허용
    'react/jsx-props-no-spreading': 'off', // props spreading을 허용하여 컴포넌트 사용 편의성 확보
    'no-console': ['warn', { allow: ['warn', 'error'] }], // console.warn과 console.error는 허용하되 다른 console.log 사용 시 경고

    '@typescript-eslint/explicit-module-boundary-types': 'warn', // 함수의 반환 타입을 명시하도록 경고하여 타입 안정성을 강화
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수에 경고 표시, 단 _로 시작하는 변수는 허용하여 관례적 변수 사용 지원

    'react-hooks/rules-of-hooks': 'error', // React Hook 규칙을 강제하여 useState, useEffect 등 Hook이 올바르게 사용되도록 함
    'react-hooks/exhaustive-deps': 'warn', // useEffect의 의존성 배열을 올바르게 설정하도록 경고하여 의존성 문제 예방
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function', // 기본 컴포넌트를 const로 정의
        unnamedComponents: 'arrow-function', // 익명 함수도 화살표 함수로 설정
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
