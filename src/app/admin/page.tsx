"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminUnlocked, lockAdmin } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAdminUnlocked()) {
      router.replace("/lock");
    }
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20
    }}>
      <h1>✅ ADMIN DASHBOARD</h1>

      <button
        onClick={() => {
          lockAdmin();
          router.push("/lock");
        }}
        style={{ padding: 10 }}
      >
        Lock & Logout
      </button>
    </div>
  );
}
