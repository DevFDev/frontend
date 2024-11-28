import { NextResponse } from 'next/server'

import { HTTPError } from 'ky'

import { backendApi } from '@/services/api'

export const POST = async (req: Request): Promise<NextResponse> => {
  const { refreshToken } = await req.json()

  try {
    const { accessToken } = await backendApi
      .post('refresh', { json: { refreshToken } })
      .json<{ accessToken: string }>()
    return NextResponse.json({ success: true, accessToken })
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
