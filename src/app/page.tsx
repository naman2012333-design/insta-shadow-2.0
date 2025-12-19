"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      router.push("/lock");
    }
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>✅ Website Unlocked</h1>
      <p>Access granted. You are inside the app.</p>
    </main>
  );
}

