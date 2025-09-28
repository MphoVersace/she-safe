import React from "react";
import { getCommunities } from "../services/mockApi";

export default function NetworkingHub() {
  const communities = getCommunities();

  return (
    <div className="rounded-2xl p-4 shadow-lg bg-white/90">
      <h3 className="text-lg font-semibold">Networking Hub</h3>
      <ul className="mt-4 space-y-3">
        {communities.map((c) => (
          <li key={c.id} className="p-3 bg-purple-50 rounded-lg">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
