let activeKeys: string[] = [];

export async function generateKey() {
  const key = Math.random().toString(36).substring(2, 10).toUpperCase();
  activeKeys.push(key);
  return key;
}

export async function isValidKey(key: string) {
  return activeKeys.includes(key);
}
