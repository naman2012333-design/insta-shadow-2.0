import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { key, deviceId } = await req.json();

    if (!key || !deviceId) {
      return NextResponse.json({ success: false });
    }

    const ref = doc(db, "keys", key);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return NextResponse.json({ success: false });
    }

    const data = snap.data();

    // First time → bind device
    if (!data.deviceId) {
      await updateDoc(ref, { deviceId });
      return NextResponse.json({ success: true });
    }

    // Same device → allow
    if (data.deviceId === deviceId) {
      return NextResponse.json({ success: true });
    }

    // Different device → block
    return NextResponse.json({ success: false });

  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
