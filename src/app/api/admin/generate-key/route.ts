import { NextResponse } from "next/server";

export async function POST() {
  try {
    const key = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

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
