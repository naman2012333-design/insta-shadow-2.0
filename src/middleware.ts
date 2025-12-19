import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Always allow admin & API & lock page
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/lock")
  ) {
    return NextResponse.next();
  }

  // 🔑 Check access cookie
  const hasAccess = request.cookies.get("access_granted");

  // ❌ Not unlocked → send to lock
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/lock", request.url));
  }

  // ✅ Unlocked → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
