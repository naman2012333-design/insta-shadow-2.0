"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateKey() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/admin/generate-key", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to generate key");
      }

      const data = await res.json();
      setKey(data.key);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
        gap: 20,
      }}
    >
      <h1>✅ ADMIN DASHBOARD</h1>

      <button
        onClick={generateKey}
        disabled={loading}
        style={{
          padding: "12px 20px",
          background: "#16a34a",
          color: "#fff",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate New Key"}
      </button>

      {key && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#111",
            borderRadius: 6,
            fontSize: 18,
          }}
        >
          🔑 <b>{key}</b>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}
    </main>
  );
}
