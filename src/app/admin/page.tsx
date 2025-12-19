export default function AdminPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🔐 Admin Panel</h1>

      <p style={{ marginTop: "10px", opacity: 0.8 }}>
        Manage access keys and admin settings
      </p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "8px",
          backgroundColor: "#22c55e",
          color: "#000",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => alert("Admin access granted")}
      >
        Generate New Key
      </button>
    </main>
  );
}
