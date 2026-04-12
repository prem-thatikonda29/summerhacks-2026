import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REVEAL_TIME } from '@/lib/config'

export function proxy(request: NextRequest) {
  if (new Date() < REVEAL_TIME) {
    return NextResponse.redirect(new URL('/#tracks', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/problem-statements', '/problem-statements/:path*'],
}
