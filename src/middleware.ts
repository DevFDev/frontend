import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'
import { HTTPError } from 'ky'

import { proxyApi } from './services/api'
import { ApiResponse } from './types/api/ApiResponse.types'
import { AccessTokenResponse } from './types/api/Auth.types.d'

export const config = {
  matcher: ['/protected', '/protected/:path*'],
}

interface TokenApiResponse<T = unknown> {
  success: boolean
  result: T
}

export const requestNewToken = async (
  oldAccessToken: Token,
  refreshToken: Token
): Promise<TokenApiResponse<AccessTokenResponse>> => {
  try {
    const response = await proxyApi
      .post('api/auth/refresh', {
        json: {
          oldAccessToken,
          refreshToken,
        },
        headers: {
          Authorization: `Bearer ${refreshToken}`, // 인증 헤더 추가
        },
        credentials: 'include', // 쿠키 포함
      })
      .json<TokenApiResponse<AccessTokenResponse>>() // 응답 데이터의 타입 지정

    if (!response.success) {
      console.error('엑세스토큰 갱신 실패:', response.result)
    } else {
      console.log('액세스 토큰 성공', response.result.accessToken)
    }
    return response
  } catch (error) {
    if (error instanceof HTTPError) {
      console.error(
        'HTTP Error 발생:',
        error.response.status,
        error.response.statusText
      )
      const errorData: ApiResponse<AccessTokenResponse> =
        await error.response.json()
      return {
        success: false,
        result: { accessToken: '' },
      }
    }

    console.error('API 요청 중 알 수 없는 오류 발생:', error)
    return {
      success: false,
      result: { accessToken: '' },
    }
  }
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  let cookies = req.cookies
  let oldAccessToken = cookies.get('accessToken')?.value as string
  let refreshToken = cookies.get('refreshToken')?.value as string

  console.log('Access Token:', oldAccessToken)
  console.log('Refresh Token:', refreshToken)

  if (!oldAccessToken || !refreshToken) {
    console.log('토큰이 없습니다. 로그인 페이지로 리다이렉트합니다.')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    let decodedToken = jwt.decode(oldAccessToken) as { exp?: number }
    let currentTime = Math.floor(Date.now() / 1000)
    let expirationTime = decodedToken?.exp

    if (expirationTime && expirationTime > currentTime) {
      let timeRemaining = expirationTime - currentTime
      console.log(`남은 시간: ${timeRemaining}초`)

      if (timeRemaining < 29 * 60) {
        console.log('토큰 갱신을 시도합니다.')
        const newTokenResponse = await requestNewToken(
          oldAccessToken,
          refreshToken
        )

        if (newTokenResponse.success && newTokenResponse.result) {
          const newAccessToken = newTokenResponse.result.accessToken

          // 쿠키에 새로운 Access Token 설정
          const response = NextResponse.next()
          response.cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 1800, // 30 minutes
          })

          // 새로운 Access Token 디코딩
          decodedToken = jwt.decode(newAccessToken) as { exp?: number }
          expirationTime = decodedToken?.exp || 0
          timeRemaining = expirationTime - currentTime
          console.log(`새로운 남은 시간: ${timeRemaining}초`)

          return response
        } else {
          console.error('토큰 갱신 실패음음:', newTokenResponse.result)
          // return NextResponse.redirect(new URL('/login', req.url))
        }
      }
    } else {
      console.log('Access Token이 만료되었습니다.')
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } catch (error) {
    console.error('미들웨어 처리 중 오류 발생:', error)
    // return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
