import { NextResponse } from "next/server";
import { useKey } from "@/lib/keys";

export async function POST(req: Request) {
  const { key } = await req.json();

  const valid = useKey(key);

  if (!valid) {
    return NextResponse.json({ success: false });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("unlocked", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
