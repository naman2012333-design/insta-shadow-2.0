"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function generateKey() {
  return "IS-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState("");

  const createKey = async () => {
    setLoading(true);

    const newKey = generateKey();

    await addDoc(collection(db, "keys"), {
      key: newKey,
      active: true,
      deviceId: "",
      createdAt: Date.now(),
    });

    setLastKey(newKey);
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: 40,
      }}
    >
      <h1>🔐 Admin Key Generator</h1>

      <button
        onClick={createKey}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: 12,
          borderRadius: 6,
          border: "none",
          fontWeight: "bold",
        }}
      >
        {loading ? "Generating..." : "Generate New Key"}
      </button>

      {lastKey && (
        <p style={{ marginTop: 20 }}>
          ✅ New Key: <b>{lastKey}</b>
        </p>
      )}
    </main>
  );
}
