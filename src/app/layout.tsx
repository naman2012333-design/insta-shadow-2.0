import "./globals.css";
import { headers } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  // ✅ ADMIN ROUTE KO LOCK SE FREE KAR DIYA
  if (pathname.startsWith("/admin")) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  // 🔒 Normal users ke liye lock
  const isUnlocked = headersList.get("x-unlocked") === "true";

  if (!isUnlocked) {
    return (
      <html lang="en">
        <body
          style={{
            background: "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontFamily: "Arial",
          }}
        >
          <h1>🔐 Website Locked</h1>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
