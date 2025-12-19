"use client";
import { useEffect, useState } from "react";

export default function LockPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("deviceId")) {
      localStorage.setItem("deviceId", crypto.randomUUID());
    }
  }, []);

  const unlock = async () => {
    setError("");
    const deviceId = localStorage.getItem("deviceId");

    const res = await fetch("/api/verify-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, deviceId }),
    });

    const data = await res.json();
    if (!data.success) {
      setError("❌ This key is already used on another device");
      return;
    }

    document.cookie = "unlocked=true; path=/";
    window.location.href = "/";
  };

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
