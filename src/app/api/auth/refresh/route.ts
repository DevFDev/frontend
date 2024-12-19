import { NextRequest, NextResponse } from 'next/server'

import { AccessTokenResponse } from '@/types/api/Auth.types'
import { HTTPError } from 'ky'

import { backendApi } from '@/services/api'

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const cookies = req.cookies
  const oldAccessToken = cookies.get('accessToken')?.value
  const refreshToken = cookies.get('refreshToken')?.value

  try {
    const {
      result: { accessToken },
    } = await backendApi
      .post('v1/auth/new-token', { json: { oldAccessToken, refreshToken } })
      .json<ApiResponse<AccessTokenResponse>>()
    const res = NextResponse.json({ success: true })

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1800,
    })
    
    console.log('토큰 갱신 성공')
    return res

  } catch (error: unknown) {
    console.error('토큰 갱신 에러:', error)
    if (error instanceof HTTPError) {
      const errorData = await error.response.json()
      return NextResponse.json(
        {
          success: false,
          message: errorData.messassage || '토큰 갱신 실패',
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
