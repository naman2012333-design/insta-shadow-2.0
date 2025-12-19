"use client";

import { useState } from "react";

export default function LockPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  async function unlock() {
    const deviceId =
      localStorage.getItem("deviceId") ||
      crypto.randomUUID();

    localStorage.setItem("deviceId", deviceId);

    const res = await fetch("/api/unlock", {
      method: "POST",
      body: JSON.stringify({ key, deviceId }),
    });

    if (res.ok) {
      localStorage.setItem("unlocked", "true");
      window.location.href = "/";
    } else {
      setError("Invalid or already used key");
    }
  }

  return (
    <main style={{ color: "white", textAlign: "center", marginTop: 100 }}>
      <h1>🔒 Website Locked</h1>
      <input
        value={key}
        onChange={e => setKey(e.target.value)}
        placeholder="Enter access key"
      />
      <br /><br />
      <button onClick={unlock}>Unlock</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
