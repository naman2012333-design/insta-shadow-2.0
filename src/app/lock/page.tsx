async function unlock() {
  const res = await fetch("/api/verify-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  });

  if (!res.ok) {
    setError("Invalid or already used key");
    return;
  }

  window.location.href = "/";
}
