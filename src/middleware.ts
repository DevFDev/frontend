import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest, NextResponse } from 'next/server'

import { backendApi, proxyApi } from '@/services/api'

import { AccessTokenResponse } from './types/api/Auth.types'

export const config = {
  matcher: ['/protected', '/protected/:path*'],
  // 인증이 필요한 사이트
}

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const cookies = req.cookies
  const accessToken = cookies.get('accessToken')?.value
  const refreshToken = cookies.get('refreshToken')?.value

  if (!accessToken || accessToken.trim() === '') {
    console.log('Access Token is missing or empty')
    if (!refreshToken) {
      console.log('Refresh Token is also missing. Redirecting to /sign-in')
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  console.log('엑세스 토큰이 아직 유효합니다. ')
  return NextResponse.next()
}
