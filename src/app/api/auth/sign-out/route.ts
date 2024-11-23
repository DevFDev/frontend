import { NextResponse } from 'next/server'

export const POST = async (): Promise<NextResponse> => {
  try {
    const res = NextResponse.json({ success: true, message: '로그아웃 성공' })

    res.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })

    res.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })

    return res
  } catch (error: unknown) {
    console.error('로그아웃 처리 중 오류 발생:', error)
    return NextResponse.json(
      { success: false, message: '서버 오류로 로그아웃 실패' },
      { status: 500 }
    )
  }
}
