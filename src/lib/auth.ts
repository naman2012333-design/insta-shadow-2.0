export const ADMIN_KEY = "123456"; // 🔐 change later

export function isAdminUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("admin_unlocked") === "true";
}

export function unlockAdmin(key: string): boolean {
  if (key === ADMIN_KEY) {
    localStorage.setItem("admin_unlocked", "true");
    return true;
  }
  return false;
}

export function lockAdmin() {
  localStorage.removeItem("admin_unlocked");
}
