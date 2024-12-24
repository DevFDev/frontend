import { NextRequest, NextResponse } from 'next/server'

import { AccessTokenResponse } from '@/types/api/Auth.types'
import { HTTPError } from 'ky'

import { backendApi } from '@/services/api'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { oldAccessToken, refreshToken } = await req.json()

  console.log('Refresh Token:', refreshToken)
  console.log('Old Access Token:', oldAccessToken)
  try {
    const {
      result: { accessToken },
    } = await backendApi
      .post('v1/auth/new-token', {
        json: { oldAccessToken, refreshToken },
        headers: {
          // Authorization: `Bearer ${refreshToken}`, // 필요하다면 추가
        },
      })
      .json<ApiResponse<AccessTokenResponse>>()

    const res = NextResponse.json({ success: true })

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1800, // 30 minutes
    })

    console.log('토큰 갱신 성공')
    console.log(accessToken)

    return res // 성공 응답 반환
  } catch (error: unknown) {
    if (error instanceof HTTPError) {
      const errorData = await error.response.json()
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || '토큰 갱신 실패',
        },
        { status: error.response.status }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
