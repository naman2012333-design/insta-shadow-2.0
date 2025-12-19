import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const unlocked = req.cookies.get("unlocked");

  if (!unlocked && !req.nextUrl.pathname.startsWith("/lock")) {
    return NextResponse.redirect(new URL("/lock", req.url));
  }

  return NextResponse.next();
}
