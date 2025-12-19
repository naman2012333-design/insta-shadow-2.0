type KeyRecord = {
  used: boolean;
  deviceId?: string;
};

const keyStore = new Map<string, KeyRecord>();

export function generateKey(): string {
  const key = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  keyStore.set(key, { used: false });
  return key;
}

export function verifyKey(key: string, deviceId: string): boolean {
  const record = keyStore.get(key);
  if (!record) return false;

  if (record.used) return record.deviceId === deviceId;

  record.used = true;
  record.deviceId = deviceId;
  return true;
}
