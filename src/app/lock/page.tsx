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
      alert("Invalid Key");
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>🔒 Enter Access Key</h2>
      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key"
      />
      <br /><br />
      <button onClick={unlock}>Unlock</button>
    </main>
  );
}
