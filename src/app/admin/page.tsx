"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateKey = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/generate-key", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.success) throw new Error("Failed");

      setKey(data.key);
    } catch {
      setError("Failed to generate key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>ADMIN DASHBOARD</h2>

      <button
        onClick={generateKey}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "12px 20px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate New Key"}
      </button>

      {key && <p style={{ marginTop: 20 }}>🔑 {key}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
