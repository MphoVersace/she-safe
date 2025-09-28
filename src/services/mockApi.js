export async function sendSosAlert(payload) {
  // Call your serverless endpoint
  const res = await fetch("/api/sos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Server error: " + text);
  }
  return res.json();
}
