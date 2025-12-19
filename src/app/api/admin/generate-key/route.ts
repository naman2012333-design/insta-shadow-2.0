import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST() {
  const key = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  await setDoc(doc(db, "keys", key), {
    deviceId: null,
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ success: true, key });
}
