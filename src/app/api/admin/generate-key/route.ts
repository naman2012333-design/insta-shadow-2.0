import { NextResponse } from "next/server";
import { generateKey, saveKey } from "@/lib/keys";

export async function POST() {
  const key = generateKey();

  await saveKey({
    key,
    used: false,
    createdAt: Date.now(),
  });

  return NextResponse.json({
    success: true,
    key,
  });
}
