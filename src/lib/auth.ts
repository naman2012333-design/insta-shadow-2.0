// src/lib/auth.ts

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("device_id");

  if (!id) {
    id =
      (crypto && "randomUUID" in crypto)
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2) + Date.now().toString(36);

    localStorage.setItem("device_id", id);
  }

  return id;
}

export function markDeviceUnlocked() {
  if (typeof window === "undefined") return;
  localStorage.setItem("device_unlocked", "true");
}

export function isDeviceUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("device_unlocked") === "true";
}

export function logoutDevice() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("device_unlocked");
}
