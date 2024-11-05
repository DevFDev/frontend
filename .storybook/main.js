/** @type { import('@storybook/nextjs').StorybookConfig } */
const path = require('path')

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    const fileLoaderRule = config.module.rules.filter(
      rule => rule.test && rule.test.test('.svg')
    )
    fileLoaderRule.forEach(rule => (rule.exclude = /\.svg$/))

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    })
    return config
  },
  staticDirs: ['../public'],
}

module.exports = config
