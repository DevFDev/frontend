import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

import { proxyApi } from '@/services/api'

// import { requestNewToken } from '@/services/auth/refreshToken'

console.log('Middleware is running')
export const config = {
  matcher: ['/protected', '/protected/:path*'],
  // 인증이 필요한 사이트
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  let cookies = req.cookies
  let accessToken = cookies.get('accessToken')?.value
  let refreshToken = cookies.get('refreshToken')?.value
  console.log('middleware is running')

  async function requestNewToken(
    accessToken: Token,
    refreshToken: Token | undefined
  ) {
    //몰랐는데... 인증이 필요한 것 같네요
    const response = await proxyApi.post('api/auth/refresh', {
      json: {}, 
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        Authorization: `Bearer ${refreshToken}`,
      },
      credentials: 'include', 
    })

    if (response.ok) {
      console.log('토큰 갱신 요청 성공')
      console.log(cookies.get('accessToken')?.value)
      const responseData = await response.json()
      console.log('갱신된 토큰:', responseData)
      return responseData
    } else {
      console.error('토큰 갱신 요청 실패:', response.statusText)
      return null
    }
  }

  if (accessToken) {
    try {
      let decodedToken = jwt.decode(accessToken) as { exp?: number }
      let expirationTime = decodedToken?.exp 
      let currentTime = Math.floor(Date.now() / 1000) 

      if (expirationTime && expirationTime > currentTime) {
        console.log('Access Token 이 유효합니다.')

        // 만료 시간까지 5분 미만으로 남은 경우
        let timeRemaining = expirationTime - currentTime
        console.log(`남은 시간: ${timeRemaining}초`)

        if (timeRemaining < 18 * 60) {
          console.log('만료 시간까지 29분 미만, 토큰 갱신 요청')
          const newAccessToken = await requestNewToken(accessToken, refreshToken) // 토큰 갱신 요청
        }
      } else {
        console.log('Access Token이 만료되었습니다.')
      }
    } catch (error) {
      console.error('Access Token 처리 중 오류:', error)
    }
  }

  return NextResponse.next()
}
