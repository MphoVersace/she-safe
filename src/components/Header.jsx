import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
          SS
        </div>
        <div>
          <h1 className="text-2xl font-bold text-purple-700">SheSafe</h1>
          <p className="text-sm text-gray-600">
            Empowering Women • Protecting Futures
          </p>
        </div>
      </div>
    </header>
  );
}
