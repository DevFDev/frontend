import { NextResponse } from 'next/server'

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const POST = async (req: Request): Promise<NextResponse> => {
  const { refreshToken } = await req.json()

  try {
    const response = await fetch(`http://43.202.50.174:8080/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Token refresh failed',
        },
        { status: response.status }
      )
    }

    const { accessToken } = await response.json()

    return NextResponse.json({ success: true, accessToken })
  } catch (error: any) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
