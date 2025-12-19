"use client";

import { usePathname } from "next/navigation";

export default function LockPage() {
  const pathname = usePathname();

  // ✅ ADMIN KO LOCK NAHI DIKHANA
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>🔒 Website Locked</h1>
    </main>
  );
}
