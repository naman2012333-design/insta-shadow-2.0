"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  async function generateKey() {
    setError("");
    setKey("");

    const res = await fetch("/api/admin/generate-key", {
      method: "POST",
    });

    const data = await res.json();

    if (!data.success) {
      setError("Failed to generate key");
      return;
    }

    setKey(data.key);
  }

  return (
    <div style={{ textAlign: "center", marginTop: 120 }}>
      <h2>✅ ADMIN DASHBOARD</h2>

      <button onClick={generateKey}>Generate New Key</button>

      {key && (
        <p>
          🔑 <b>{key}</b>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
