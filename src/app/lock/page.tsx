"use client";

import { useState } from "react";

export default function LockPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  async function unlock() {
    setError("");

    const res = await fetch("/api/verify-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    const data = await res.json();

    if (!data.success) {
      setError("Invalid or already used key");
      return;
    }

    document.cookie = "unlocked=true; path=/";
    window.location.href = "/";
  }

  return (
    <div style={{ textAlign: "center", marginTop: 120 }}>
      <h2>🔒 Website Locked</h2>
      <input value={key} onChange={(e) => setKey(e.target.value)} />
      <br /><br />
      <button onClick={unlock}>Unlock</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
