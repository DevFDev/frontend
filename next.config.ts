// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos', 'dfdnew.s3.ap-northeast-2.amazonaws.com'], // 여기에 도메인 추가
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    })

    return config
  },
}

export default nextConfig

