// src/lib/keys.ts

type KeyRecord = {
  used: boolean;
};

const keyStore = new Map<string, KeyRecord>();

export function createKey() {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();

  keyStore.set(key, { used: false });

  return key;
}

export function verifyKey(key: string) {
  const record = keyStore.get(key);

  if (!record) {
    return false;
  }

  if (record.used) {
    return false;
  }

  record.used = true;
  keyStore.set(key, record);

  return true;
}
