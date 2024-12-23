import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

import { proxyApi } from '@/services/api'

import { AccessTokenResponse } from './types/api/Auth.types'

console.log('Middleware is running')
export const config = {
  matcher: ['/protected', '/protected/:path*'], // 인증이 필요한 경로
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  let cookies = req.cookies
  let accessToken = cookies.get('accessToken')?.value
  const refreshToken = cookies.get('refreshToken')?.value

  console.log('Middleware is running')

  async function requestNewToken(): Promise<string | null> {
    const response = await proxyApi.post('api/auth/refresh', {
      credentials: 'include',
    })

    if (response.ok) {
      const responseData =
        await response.json<ApiResponse<AccessTokenResponse>>()
      return responseData.result.accessToken
    }
    return null
  }

  if (accessToken) {
    try {
      let decodedToken = jwt.decode(accessToken) as { exp?: number }
      let expirationTime = decodedToken?.exp // 만료 시간 (Unix 타임스탬프, 초 단위)
      let currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (Unix 타임스탬프, 초 단위)

      if (expirationTime && expirationTime > currentTime) {
        console.log('Access Token 이 유효합니다.')

        let timeRemaining = expirationTime - currentTime
        console.log(`남은 시간: ${timeRemaining}초`)

        if (timeRemaining < 28 * 60) {
          console.log('만료 시간까지 28분 미만, 토큰 갱신 요청')
          const newAccessToken = await requestNewToken()

          if (newAccessToken) {
            console.log('새로운 Access Token 발급 성공')
            const res = NextResponse.next()
            // 갱신된 Access Token으로 미들웨어 변수 업데이트
            accessToken = newAccessToken

            // 갱신된 Access Token을 기반으로 남은 시간 재계산
            decodedToken = jwt.decode(accessToken) as { exp?: number }
            expirationTime = decodedToken?.exp

            if (expirationTime) {
              const updatedTimeRemaining =
                expirationTime - Math.floor(Date.now() / 1000)
              console.log(`갱신된 토큰의 남은 시간: ${updatedTimeRemaining}초`)
            }

            return res // 갱신된 쿠키와 함께 응답 반환
          } else {
            console.error('새로운 Access Token 발급 실패')
          }
        }
      } else {
        console.log('Access Token이 만료되었습니다.')
      }
    } catch (error) {
      console.error('Access Token 처리 중 오류:', error)
    }
  } else {
    console.log('Access Token is missing or empty')
    if (!refreshToken) {
      console.log('Refresh Token is also missing. Redirecting to /sign-in')
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  return NextResponse.next()
}
