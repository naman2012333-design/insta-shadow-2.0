"use client";

import { useState } from "react";

export default function LockPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  async function unlock() {
    try {
      // Device ID (same browser = same ID)
      let deviceId = localStorage.getItem("device_id");
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("device_id", deviceId);
      }

      // Call unlock API
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          deviceId,
        }),
      });

      if (!res.ok) {
        setError("❌ Invalid or already used key");
        return;
      }

      // ✅ STEP 4 — THIS IS THE IMPORTANT PART
      // Cookie set so same device will NOT ask key again
      document.cookie =
        "access_granted=true; path=/; max-age=31536000";

      // Redirect to main site
      window.location.href = "/";
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🔒 Website Locked</h1>

      <input
        type="text"
        placeholder="Enter access key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{
          padding: "10px",
          width: "240px",
          borderRadius: "6px",
          border: "1px solid #333",
        }}
      />

      <button
        onClick={unlock}
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: "#16a34a",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Unlock
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
