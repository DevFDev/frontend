import { NextResponse } from 'next/server'

import { ApiResponse } from '@/types/api/ApiResponse.types'
import { SignInRequest, SignInResponse } from '@/types/api/Auth.types'
import { HTTPError } from 'ky'

import { backendApi } from '@/services/api'

export const POST = async (req: Request): Promise<NextResponse> => {
  const { email, password }: SignInRequest = await req.json()

  try {
    const {
      result: { accessToken, refreshToken },
    } = await backendApi
      .post('v1/auth/sign-in', {
        json: { email, password },
      })
      .json<ApiResponse<SignInResponse>>()

    const res = NextResponse.json({ success: true })

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1800,
    })

    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1209600,
    })

    return res
  } catch (error: unknown) {
    console.error('Login failed:', error)

    if (error instanceof HTTPError) {
      const errorData = await error.response.json()
      return NextResponse.json(
        { error: errorData.message || 'Login failed' },
        { status: error.response.status }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
