import { NextResponse } from 'next/server'

import { backendApi } from '@/services/api'

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export const POST = async (req: Request): Promise<NextResponse> => {
  const { refreshToken } = await req.json()

  try {
    const { accessToken } = await backendApi
      .post('/refresh', { json: { refreshToken } })
      .json<{ accessToken: string }>()
    return NextResponse.json({ success: true, accessToken })
  } catch (error: any) {
    console.error('토큰 갱신 에러:', error)

    if (error.response) {
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
