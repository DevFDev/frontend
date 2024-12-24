import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

import { refreshAuth } from './services/auth/auth'

export const config = {
  matcher: ['/protected', '/protected/:path*'],
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const cookies = req.cookies
  const accessToken = cookies.get('accessToken')?.value as string
  const refreshToken = cookies.get('refreshToken')?.value as string

  console.log('Access Token:', accessToken)
  console.log('Refresh Token:', refreshToken)

  if (!accessToken || !refreshToken) {
    console.log('토큰이 없습니다. 로그인 페이지로 리다이렉트합니다.')
    // return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const decodedToken = jwt.decode(accessToken) as { exp?: number }
    const currentTime = Math.floor(Date.now() / 1000)
    const expirationTime = decodedToken?.exp

    if (expirationTime && expirationTime > currentTime) {
      const timeRemaining = expirationTime - currentTime
      console.log(`남은 시간: ${timeRemaining}초`)

      if (timeRemaining < 28 * 60) {
        console.log('토큰 갱신을 시도합니다.')
        const response = await refreshAuth(accessToken, refreshToken)

        if (!response.ok) {
          console.log('토큰 갱신 실패. 로그인 페이지로 리다이렉트합니다.')
          return NextResponse.redirect(new URL('/login', req.url))
        }

        console.log('토큰 갱신 성공.')
      }
    } else {
      console.log('Access Token이 만료되었습니다.')
      // return NextResponse.redirect(new URL('/login', req.url))
    }
  } catch (error) {
    console.error('미들웨어 처리 중 오류 발생:', error)
    // return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
