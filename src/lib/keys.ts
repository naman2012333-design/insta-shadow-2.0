import crypto from "crypto";

type KeyData = {
  key: string;
  used: boolean;
  createdAt: number;
  deviceId?: string;
};

let keys: KeyData[] = [];

export function generateKey() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

export async function saveKey(data: KeyData) {
  keys.push(data);
}

export async function validateKey(key: string, deviceId: string) {
  const found = keys.find(k => k.key === key);

  if (!found) return false;
  if (found.used && found.deviceId !== deviceId) return false;

  found.used = true;
  found.deviceId = deviceId;
  return true;
}
