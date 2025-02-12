import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<NextResponse> => {
  const accessToken = (await cookies()).get('accessToken')?.value

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: 'No access token' },
      { status: 401 }
    )
  }

  return NextResponse.json({ success: true, accessToken })
}
