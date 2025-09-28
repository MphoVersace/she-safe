import React, { useState } from "react";
import { sendSosAlert } from "../services/mockApi";
import { toast } from "react-toastify";

export default function SOSButton() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleActivate() {
    setSending(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by this browser.");
      setSending(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        await sendSosAlert({ user: { name: "Mpho" }, coords });
        toast.success("SOS alert sent!");
        setSent(true);
        setSending(false);
      },
      () => {
        toast.error("Unable to get location.");
        setSending(false);
      }
    );
  }

  function handleDeactivate() {
    setSent(false);
    toast.info("SOS deactivated.");
  }

  return (
    <div className="rounded-2xl p-6 bg-white/90 shadow-lg text-center">
      <h2 className="text-xl font-semibold">Emergency Safety</h2>
      <p className="text-sm text-gray-600 mt-2">
        Activate SOS to alert your trusted contacts with your live location.
      </p>

      <div className="mt-4">
        {sent ? (
          <button
            onClick={handleDeactivate}
            className="px-6 py-3 rounded-xl bg-gray-200"
          >
            Deactivate SOS
          </button>
        ) : (
          <button
            onClick={handleActivate}
            disabled={sending}
            className="px-6 py-3 rounded-xl bg-red-500 text-white"
          >
            {sending ? "Sending..." : "Activate SOS"}
          </button>
        )}
      </div>
    </div>
  );
}
