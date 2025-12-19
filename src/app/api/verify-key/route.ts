import { NextResponse } from "next/server";
import { verifyKey } from "@/lib/keys";

export async function POST(req: Request) {
  const body = await req.json();
  const { key } = body;

  if (!key) {
    return NextResponse.json({ success: false });
  }

  const valid = verifyKey(key);

  if (!valid) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
