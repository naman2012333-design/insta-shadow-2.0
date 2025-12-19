import { NextResponse } from "next/server";
import { generateKey } from "@/lib/keys";

export async function POST() {
  const key = generateKey();

  return NextResponse.json({
    success: true,
    key,
  });
}
