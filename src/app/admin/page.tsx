"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateKey = async () => {
    setLoading(true);
    setError("");
    setKey(null);

    try {
      const res = await fetch("/api/admin/generate-key", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Failed");
      }

      setKey(data.key);
    } catch (err) {
      setError("Failed to generate key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
        color: "#fff",
      }}
    >
      <h2>✅ ADMIN DASHBOARD</h2>

      <button
        onClick={generateKey}
        disabled={loading}
        style={{
          padding: "12px 20px",
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          marginTop: 16,
        }}
      >
        {loading ? "Generating..." : "Generate New Key"}
      </button>

      {key && (
        <p style={{ marginTop: 20, fontSize: 18 }}>
          🔑 <b>{key}</b>
        </p>
      )}

      {error && (
        <p style={{ marginTop: 12, color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}
