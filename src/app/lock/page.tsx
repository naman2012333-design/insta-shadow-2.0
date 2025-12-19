"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { unlockAdmin } from "@/lib/auth";

export default function LockPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleUnlock() {
    const ok = unlockAdmin(key);
    if (ok) {
      router.push("/admin");
    } else {
      setError("❌ Invalid Key");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16
    }}>
      <h1>🔒 Admin Locked</h1>

      <input
        type="password"
        placeholder="Enter admin key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ padding: 10 }}
      />

      <button onClick={handleUnlock} style={{ padding: 10 }}>
        Unlock
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
