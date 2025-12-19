import { NextResponse } from "next/server";
import { verifyKey } from "@/lib/keyStore";

export async function POST(req: Request) {
  const { key } = await req.json();

  const valid = verifyKey(key);

  if (!valid) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
