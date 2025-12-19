import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Insta Shadow 2.0",
  description: "Admin controlled app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  // ✅ ADMIN ROUTE — NO LOCK
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  // 🔒 LOCKED FOR ALL OTHER ROUTES
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial",
        }}
      >
        <h1>🔒 Website Locked</h1>
      </body>
    </html>
  );
}
