import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin & lock page always allowed
  if (pathname.startsWith("/admin") || pathname.startsWith("/lock")) {
    return NextResponse.next();
  }

  const unlocked = request.cookies.get("insta_shadow_unlocked");

  if (!unlocked) {
    return NextResponse.redirect(new URL("/lock", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
