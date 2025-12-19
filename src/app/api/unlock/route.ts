import { NextResponse } from "next/server";
import { validateKey } from "@/lib/keys";

export async function POST(req: Request) {
  const { key, deviceId } = await req.json();

  const isValid = await validateKey(key, deviceId);

  if (!isValid) {
    return new NextResponse("Invalid or used key", { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("unlocked", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return res;
}
