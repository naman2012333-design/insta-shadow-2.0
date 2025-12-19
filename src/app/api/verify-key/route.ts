import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  const { key, deviceId } = await req.json();

  const ref = doc(db, "keys", key);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return NextResponse.json({ success: false });
  }

  const data = snap.data();

  // first use → bind device
  if (!data.deviceId) {
    await updateDoc(ref, { deviceId });
    return NextResponse.json({ success: true });
  }

  // same device → allow
  if (data.deviceId === deviceId) {
    return NextResponse.json({ success: true });
  }

  // different device → block
  return NextResponse.json({ success: false });
}
