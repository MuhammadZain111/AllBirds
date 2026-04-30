import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"


export async function proxy(request: NextRequest) {
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const  pathname  = request.nextUrl.pathname


  // const path = req.nextUrl.pathname



  // if (
  //   token &&
  //   (pathname.startsWith('/sign-in') ||
  //     pathname.startsWith('/sign-out') ||
  //     pathname.startsWith('/sign-up'))
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
 
  // If NOT logged in → block dashboard

  
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 🔐 Super Admin only
  if (pathname.startsWith("/admindashboard") && token.role !== 1) {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  // 🔐 Admin + Super Admin
  if (pathname.startsWith("/workerdashboard") && ![1, 2].includes(Number(token.role))){
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/superadmin/:path*",
    "/admindashboard/:path*"
  ]
};