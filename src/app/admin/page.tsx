"use client";
import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");

  const generate = async () => {
    setErr("");
    const res = await fetch("/api/admin/generate-key", { method: "POST" });
    const data = await res.json();
    if (!data.success) return setErr("Failed");
    setKey(data.key);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 120 }}>
      <h2>ADMIN</h2>
      <button onClick={generate}>Generate Key</button>
      {key && <p>🔑 {key}</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
}
