import React from "react";

export default function Input({ label, onChange, placeholder, value, type = "text" }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-400">{label}</label>
      <input
        type={type}
        className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}
