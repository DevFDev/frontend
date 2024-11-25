import { type NextRequest, NextResponse } from 'next/server'

console.log('Middleware is running')
export const config = {
  matcher: ['/protected/:path*'],
  // 인증이 필요한 사이트
}

export async function middleware(req: NextRequest) {
  console.log('Middleware is running')
  console.log('Requested URL:', req.nextUrl.pathname)
  console.log('Headers:', req.headers)
  const cookies = req.headers.get('cookie')
  const accessToken = cookies?.match(/accessToken=([^;]*)/)?.[1]
  const refreshToken = cookies?.match(/refreshToken=([^;]*)/)?.[1]

  if (!accessToken) {
    console.log('Access Token is missing')
    if (!refreshToken) {
      console.log('Refresh Token is also missing. Redirecting to /sign-in')
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    try {
      const refreshResponse = await fetch(`/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (!refreshResponse.ok) {
        console.error('Failed to refresh Access Token. Redirecting to /sign-in')
        return NextResponse.redirect(new URL('/sign-in', req.url))
      }

      const { accessToken: newAccessToken } = await refreshResponse.json()

      const res = NextResponse.next()
      res.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 3600,
      })
      console.log('Access Token refreshed successfully')
      return res
    } catch (error) {
      console.error('Middleware Error', error)
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }
  console.log('Access Token is valid. Keep going')
  return NextResponse.next()
}
