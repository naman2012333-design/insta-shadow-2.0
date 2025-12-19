export const validKeys = new Set<string>();

export function generateKey() {
  const key =
    "IS-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  validKeys.add(key);
  return key;
}

export function useKey(key: string) {
  if (validKeys.has(key)) {
    validKeys.delete(key); // one-time use
    return true;
  }
  return false;
}
