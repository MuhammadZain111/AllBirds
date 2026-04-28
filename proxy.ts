import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"


export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = request.nextUrl


  if (
    token &&
    (pathname.startsWith('/sign-in') ||
      pathname.startsWith('/sign-out') ||
      pathname.startsWith('/sign-up'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }


  // If NOT logged in → block dashboard
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}