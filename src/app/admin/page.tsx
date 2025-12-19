"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateKey = async () => {
    setLoading(true);
    setError("");
    setKey(null);

    try {
      const res = await fetch("/api/admin/generate-key", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
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
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2>✅ ADMIN DASHBOARD</h2>

      <button
        onClick={generateKey}
        disabled={loading}
