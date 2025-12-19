// simple in-memory key store

const keys = new Set<string>();

export function createKey() {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();
  keys.add(key);
  return key;
}

export function useKey(inputKey: string) {
  if (!keys.has(inputKey)) return false;

  keys.delete(inputKey); // 1 key = 1 device
  return true;
}
