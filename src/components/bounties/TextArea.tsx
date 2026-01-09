
// TextArea.tsx (companion component)
import React from "react";

export default function TextArea({ label, onChange, placeholder, value }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-400">{label}</label>
      <textarea
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        rows={4}
      />
    </div>
  );
}