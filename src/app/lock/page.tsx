"use client";

import { useState } from "react";

export default function LockPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  async function submitKey() {
    const deviceId =
      localStorage.getItem("device_id") ||
      crypto.randomUUID();

    localStorage.setItem("device_id", deviceId);

    const res = await fetch("/api/validate-key", {
      method: "POST",
      body: JSON.stringify({ key, deviceId }),
    });

    const data = await res.json();

    if (!data.valid) {
      setError(data.reason);
      return;
    }

    localStorage.setItem("unlocked", "true");
    window.location.href = "/";
  }

  return (
    <main style={{ color: "#fff", textAlign: "center" }}>
      <h1>🔒 Website Locked</h1>

      <input
        placeholder="Enter access key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <button onClick={submitKey}>Unlock</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
