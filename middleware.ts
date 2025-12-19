import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Admin route hamesha open rahe
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // ✅ Lock page bhi open rahe
  if (pathname.startsWith("/lock")) {
    return NextResponse.next();
  }

  // 🔑 Check unlock cookie
  const unlocked = request.cookies.get("unlocked")?.value;

  if (unlocked === "true") {
    return NextResponse.next();
  }

  // 🔒 Baaki sab lock page par redirect
  return NextResponse.redirect(new URL("/lock", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
