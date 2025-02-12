import ky from 'ky'

import { proxyApi } from '@/services/api'

async function getAccessToken(): Promise<string> {
  try {
    const data = await proxyApi
      .get('api/auth/access')
      .json<{ accessToken?: string }>()

    return data.accessToken ?? ''
  } catch {
    return ''
  }
}

export const authProxy = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async request => {
        const accessToken = await getAccessToken()

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`)
        }
      },
    ],
  },
})
