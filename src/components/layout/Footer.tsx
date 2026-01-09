import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-md border-t border-emerald-500/20 py-8 relative">
      {/* Subtle glow effect at the top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-400 flex items-center justify-center gap-2 group">
          <span>Made by team</span>
          <span className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
            async await
          </span>
          <span>from India</span>
          <span className="text-red-500 animate-pulse inline-block transform group-hover:scale-110 transition-transform">
            ❤️
          </span>
        </p>
      </div>
    </footer>
  );
}