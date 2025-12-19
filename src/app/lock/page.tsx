"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LockPage() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const unlock = () => {
    if (key === "123456") {
      localStorage.setItem("access", "true");
      router.push("/");
    } else {
      alert("❌ Invalid Key");
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
      }}
    >
      <div style={{ width: 300, textAlign: "center" }}>
        <h2 style={{ marginBottom: 20 }}>🔒 Enter Access Key</h2>

        <input
          type="password"
          placeholder="Enter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 5,
            border: "none",
          }}
        />

        <button
          onClick={unlock}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 5,
            border: "none",
            background: "#fff",
            color: "#000",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Unlock
        </button>
      </div>
    </main>
  );
}
