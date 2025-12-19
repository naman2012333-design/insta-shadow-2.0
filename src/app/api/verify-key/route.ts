import { NextResponse } from "next/server";
import { verifyKey } from "@/lib/keys";

export async function POST(req: Request) {
  const { key } = await req.json();

  const isValid = verifyKey(key);

  if (!isValid) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // Device binding (1 key = 1 device)
  res.cookies.set("unlocked", "true", {
    httpOnly: true,
    path: "/",
  });

  return res;
}
