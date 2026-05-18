import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const role = token?.role ?? null;

  // =========================
  // 1. NEXTAUTH / API BYPASS
  // =========================
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // =========================
  // 2. AUTH ROUTES (sign-in/up)
  // =========================
  const authRoutes = ["/sign-in", "/sign-up"];

  if (authRoutes.includes(pathname)) {
    if (token) {
      if (role === 1)
        return NextResponse.redirect(new URL("/superadmin", request.url));

      if (role === 2)
        return NextResponse.redirect(new URL("/admindashboard", request.url));

      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // =========================
  // 3. NOT LOGGED IN USERS
  // =========================
  const publicRoutes = ["/"];

  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // =========================
  // 4. ROLE-BASED ACCESS CONTROL (STRICT)
  // =========================

  // 🔐 SUPER ADMIN (ONLY role 1)
  if (role === 1) {
    if (!pathname.startsWith("/superadmin")) {
      return NextResponse.redirect(new URL("/superadmin", request.url));
    }
  }

  // 🔐 ADMIN (ONLY role 2)
  else if (role === 2) {
    if (
      !pathname.startsWith("/admindashboard") &&
      !pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(new URL("/admindashboard", request.url));
    }
  }

  // 🔐 USER (role 3) — IMPORTANT FIX
  else {
    const blockedRoutes = ["/superadmin", "/admindashboard"];

    if (blockedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
