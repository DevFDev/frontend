import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json', // 사용할 tsconfig 파일 지정
      },
    ],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!**/*.stories.{ts,tsx}', // stories 파일 제외
    '!src/assets/**', // assets 디렉토리 제외
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/fileMock.js', // SVG 파일을 모킹
    '^@/(.*)$': '<rootDir>/src/$1', // 다른 경로 매핑
  },
}

export default config
