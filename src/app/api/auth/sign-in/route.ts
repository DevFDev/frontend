import { NextResponse } from 'next/server'

export const POST = async (req: Request): Promise<NextResponse> => {
  const { email, password } = await req.json()
  const response = await fetch('http://43.202.50.174:8080/v1/auth/sign-in', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: response.status }
    )
  }

  const data = await response.json()
  const { accessToken, refreshToken } = data.result

  const res = NextResponse.json({ success: true })

  res.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 3600,
  })

  res.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 1209600,
  })

  return res
}
