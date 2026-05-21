import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const role = (token?.role as number | null) ?? null;

  // 1. API bypass
  if (pathname.startsWith("/api")) return NextResponse.next();

  // 2. Route definitions
  const authRoutes     = ["/sign-in", "/sign-up"];
  const publicExact    = ["/", "/profile"];
  const publicPrefixes = ["/products", "/men", "/women", "/shoes", "/category", "/collections","/forgot-password","/reset-password", ];
  const protectedPrefixes = ["/orders", "/cart"];

  const isAuthRoute    = authRoutes.includes(pathname);
  const isPublicRoute  =
    publicExact.includes(pathname) ||
    publicPrefixes.some((p) => pathname.startsWith(p));
  const isProtected    = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isSuperAdmin   = pathname.startsWith("/superadmin");
  const isAdmin        = pathname.startsWith("/admindashboard");

  // 3. Super admin (role 1)
  if (token && role === 1) {
    if (isAuthRoute) return NextResponse.next();
    if (!isSuperAdmin) return NextResponse.redirect(new URL("/superadmin", request.url));
    return NextResponse.next();
  }

  // 4. Sub-admin (role 2)
  if (token && role === 2) {
    if (isAuthRoute) return NextResponse.next();
    if (!isAdmin) return NextResponse.redirect(new URL("/admindashboard", request.url));
    return NextResponse.next();
  }

  // 5. Guest (no token)
  if (!token) {
    if (isAuthRoute || isPublicRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/sign-in", request.url));  // only blocks protected
  }

  // 6. Logged-in user (role 3)
  if (isAuthRoute) return NextResponse.redirect(new URL("/", request.url));
  if (isSuperAdmin || isAdmin) return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};