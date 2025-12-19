import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function saveKey(key: string) {
  await setDoc(doc(db, "keys", key), {
    used: false,
    deviceId: null,
    createdAt: Date.now(),
  });
}

export async function validateKey(key: string, deviceId: string) {
  const ref = doc(db, "keys", key);
  const snap = await getDoc(ref);

  if (!snap.exists()) return { valid: false, reason: "Invalid key" };

  const data = snap.data();

  if (data.used && data.deviceId !== deviceId) {
    return { valid: false, reason: "Key already used on another device" };
  }

  if (!data.used) {
    await updateDoc(ref, {
      used: true,
      deviceId,
      usedAt: Date.now(),
    });
  }

  return { valid: true };
}
