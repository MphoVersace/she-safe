cat > (api / sos.js) << "EOF";
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
const twilio = require("twilio");

module.exports = async (req, res) => {
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
      return res
        .status(500)
        .json({ error: "Server misconfigured (missing env vars)." });
    }

    const client = twilio(accountSid, authToken);

    const locationText = coords
      ? `Location: https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
      : "Location unavailable";
    const messageBody = `SOS from ${user.name || "Unknown"} — ${locationText}`;

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
    console.error("Error in /api/sos:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
};
EOF;
