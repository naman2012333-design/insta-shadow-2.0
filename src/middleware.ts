import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get("access_granted");

  const { pathname } = request.nextUrl;

  // Admin route always allowed
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Lock page allowed
  if (pathname.startsWith("/lock")) {
    return NextResponse.next();
  }

  // If not logged in → redirect to lock
  if (!hasAccess) {
    return NextResponse.redirect(new URL("/lock", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
