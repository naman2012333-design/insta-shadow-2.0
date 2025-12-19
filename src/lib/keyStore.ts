// src/lib/keyStore.ts

type KeyRecord = {
  used: boolean;
};

const globalAny = global as any;

if (!globalAny.__KEY_STORE__) {
  globalAny.__KEY_STORE__ = new Map<string, KeyRecord>();
}

const store: Map<string, KeyRecord> = globalAny.__KEY_STORE__;

export function createKey() {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();
  store.set(key, { used: false });
  return key;
}

export function verifyKey(key: string) {
  const record = store.get(key);
  if (!record || record.used) return false;
  record.used = true;
  return true;
}
