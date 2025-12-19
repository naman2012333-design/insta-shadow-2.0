import { NextResponse } from "next/server";
import { createKey } from "@/lib/keys";

export async function POST() {
  try {
    const key = createKey();

    return NextResponse.json({
      success: true,
      key,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
