import { NextRequest, NextResponse } from 'next/server'

import { proxyApi } from '@/services/api'

console.log('Middleware is running')
export const config = {
  matcher: ['/protected/:path*'],
  // 인증이 필요한 사이트
}

export async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  console.log('Middleware is running')
  console.log('Requested URL:', req.nextUrl.pathname)
  console.log('Headers:', req.headers)

  const cookies = req.headers.get('cookie')
  const accessToken = cookies?.match(/accessToken=([^;]*)/)?.[1]
  const refreshToken = cookies?.match(/refreshToken=([^;]*)/)?.[1]

  if (!accessToken) {
    console.log('Access Token is missing')
    if (!refreshToken) {
      console.log('Refresh Token is also missing. Redirecting to /sign-in')
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    try {
      type RefreshToken = { accessToken: string }
      const { accessToken: newAccessToken } = await proxyApi
        .post(`api/auth/refresh`, {
          json: { refreshToken },
        })
        .json<RefreshToken>()

      console.log('엑세스 토큰이 성공적으로 갱신되었습니다', newAccessToken)

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
