import React from "react";
import { getMentors } from "../services/mockApi";

export default function MentorList() {
  const mentors = getMentors();

  return (
    <div className="rounded-2xl p-4 shadow-lg bg-white/90">
      <h3 className="text-lg font-semibold">Mentorship</h3>
      <ul className="mt-4 space-y-3">
        {mentors.map((m) => (
          <li key={m.id} className="p-3 bg-purple-50 rounded-lg">
            {m.name} — {m.expertise}
          </li>
        ))}
      </ul>
    </div>
  );
}
