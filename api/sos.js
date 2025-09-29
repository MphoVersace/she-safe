/**
 * Vercel Serverless function to send SMS via Twilio.
 * Expects POST JSON: { user: { name }, coords: { latitude, longitude } }
 *
 * Env variables (set in Vercel dashboard):
 * TWILIO_ACCOUNT_SID
 * TWILIO_AUTH_TOKEN
 * TWILIO_FROM_NUMBER
 * TRUSTED_CONTACTS   (comma-separated, e.g. +27831234567,+27831112222)
 */
import twilio from "twilio"; // <--- CRITICAL FIX: Use 'import'

export default async function (req, res) {
  // <--- CRITICAL FIX: Use 'export default'
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const { user = {}, coords = null } = body;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM_NUMBER;
    const contacts = (process.env.TRUSTED_CONTACTS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!accountSid || !authToken || !from || contacts.length === 0) {
      console.error("Missing ENV vars for Twilio client initialization.");
      return res
        .status(500)
        .json({ error: "Server misconfigured (missing Twilio env vars)." });
    }

    const client = twilio(accountSid, authToken);

    // VITAL FIX: Correct Google Maps URL and message body
    const locationText = coords
      ? `Location: https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
      : "Location unavailable";

    const userName = user.name ? user.name.trim() : "Unknown User";
    const messageBody = `SOS Emergency Alert from ${userName}. ${locationText}`;
    // END VITAL FIX

    const results = [];
    for (const to of contacts) {
      const msg = await client.messages.create({
        body: messageBody,
        from,
        to,
      });
      results.push({ to, sid: msg.sid, status: msg.status });
    }

    return res.status(200).json({ ok: true, sent: results });
  } catch (err) {
    console.error("Fatal Error in /api/sos:", err.stack);
    return res
      .status(500)
      .json({ error: err.message || "Unknown server error" });
  }
}
