type KeyRecord = {
  key: string;
  used: boolean;
};

const keyStore: Record<string, KeyRecord> = {};

export function generateKey() {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();

  keyStore[key] = {
    key,
    used: false,
  };

  return key;
}

export function verifyKey(inputKey: string) {
  const record = keyStore[inputKey];

  if (!record) return false;
  if (record.used) return false;

  record.used = true;
  return true;
}
