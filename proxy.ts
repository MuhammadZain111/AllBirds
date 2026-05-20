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

  // ==== API BYPASS ===

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ====
  // 2. ROUTE DEFINITION

  const ROUTES = {
    auth: ["/sign-in", "/sign-up"],
    public: ["/", "/products", "/men", "/women", "/profile"],
    protected: ["/orders", "/cart"],
    superadmin: "/superadmin",
    admin: "/admindashboard",
  };

  const isSuperAdminRoute = pathname.startsWith(ROUTES.superadmin);
  const isAdminRoute = pathname.startsWith(ROUTES.admin);
  const isAuthRoute = ROUTES.auth.includes(pathname);
  const isPublicRoute = ROUTES.public.includes(pathname);

  // =========================
  // 3. SUPER ADMIN (role === 1)
  // Can access: /superadmin/*, /sign-in, /sign-up
  // Blocked from: public pages, admin dashboard, protected pages
  // =========================
  if (token && role === 1) {
    if (isAuthRoute) return NextResponse.next(); // ✅ allow sign-in/sign-up

    if (!isSuperAdminRoute) {
      return NextResponse.redirect(new URL(ROUTES.superadmin, request.url));
    }
    return NextResponse.next();
  }

  // =========================
  // 4. SUB-ADMIN (role === 2)
  // Can access: /admindashboard/*, /sign-in, /sign-up
  // Blocked from: public pages, superadmin, protected pages
  // =========================
  if (token && role === 2) {
    if (isAuthRoute) return NextResponse.next(); // ✅ allow sign-in/sign-up

    if (!isAdminRoute) {
      return NextResponse.redirect(new URL(ROUTES.admin, request.url));
    }
    return NextResponse.next();
  }

  // =========================
  // 5. GUEST (no token)
  // =========================
  if (!token) {
    if (isAuthRoute || isPublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // =========================
  // 6. LOGGED-IN USER (role === 3)
  // =========================
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isSuperAdminRoute || isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
