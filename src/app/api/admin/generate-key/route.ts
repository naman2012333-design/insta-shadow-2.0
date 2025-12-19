import { NextResponse } from "next/server";
import { createKey } from "@/lib/keyStore";

export async function POST() {
  try {
    const key = createKey();
    return NextResponse.json({ success: true, key });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
