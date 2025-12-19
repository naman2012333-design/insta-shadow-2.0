import { NextResponse } from "next/server";
import { generateKey } from "@/lib/keys";

export async function POST() {
  try {
    const key = await generateKey();

    return NextResponse.json(
      { success: true, key },
      { status: 200 }
    );
  } catch (error) {
    console.error("KEY GENERATION ERROR:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
