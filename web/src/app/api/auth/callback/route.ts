import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const accessTokenResponse = await api.post('/auth', {
    code,
  })

  const { token } = accessTokenResponse.data

  const redirectUrl = new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
