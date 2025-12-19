"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const currentPath = window.location.pathname;

    // Agar locked hai aur lock page par nahi ho
    if (!access && currentPath !== "/lock") {
      router.push("/lock");
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
