import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest, NextResponse } from 'next/server'

import { backendApi, proxyApi } from '@/services/api'

import { AccessTokenResponse } from './types/api/Auth.types'

console.log('Middleware is running')
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

  console.log('Access Token:', accessToken)
  console.log('Refresh Token:', refreshToken)

  if (!accessToken || accessToken.trim() === '') {
    console.log('Access Token is missing or empty')
    if (!refreshToken) {
      console.log('Refresh Token is also missing. Redirecting to /sign-in')
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    try {
      const { result } = await backendApi
        .post(`v1/auth/new-token`, {
          json: { oldAccessToken: accessToken, refreshToken },
        })
        .json<ApiResponse<AccessTokenResponse>>()

      const newAccessToken = result.accessToken

      console.log('엑세스 토큰이 성공적으로 갱신되었습니다', newAccessToken)

      if (!newAccessToken) {
        console.error('Failed to refresh Access Token: No token returned')
        return NextResponse.redirect(new URL('/sign-in', req.url))
        // return NextResponse.next()
      }

      const res = NextResponse.next()

      res.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 3600,
      })

      return res
    } catch (error: unknown) {
      console.error('엑세스 토큰 갱신 실패', error)
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }
  console.log('엑세스 토큰이 아직 유효합니다. ')
  return NextResponse.next()
}
