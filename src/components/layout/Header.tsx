import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, Plus, LogOut, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MovementWalletButton } from "../wallet";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { href: "/repositories", label: "Explore" },
    { href: "/bounties", label: "Bounty" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <header className="w-full bg-black/95 backdrop-blur-md border-b border-emerald-500/20 sticky top-0 z-50 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-14 md:h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/CodeVault.png" 
                alt="layR" 
                className="h-6 md:h-7 w-auto transition-all group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              />
            </Link>
          </div>

          {/* Center Section: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-emerald-500/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] rounded-lg transition-all"
              />
            </div>
          </div>

          {/* Right Section: Nav + Actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      location.pathname === link.href
                        ? "bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                    }`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-6 bg-emerald-500/20 mx-2" />

            {/* Auth Actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/repositories/new">
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black text-sm font-semibold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all rounded-full flex items-center gap-2 hover:scale-105">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden lg:inline">Add Project</span>
                  </button>
                </Link>

                <Link to="/profile/me">
                  <button className="p-2.5 text-gray-400 hover:text-emerald-400 transition-all rounded-lg hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <User className="w-5 h-5" />
                  </button>
                </Link>

                <MovementWalletButton />

                <button 
                  onClick={handleLogout}
                  className="p-2.5 text-gray-400 hover:text-red-400 transition-all rounded-lg hover:bg-red-500/10"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="text-gray-400 hover:text-emerald-400 text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-emerald-500/5">
                    Sign in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2.5 bg-white text-black text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all rounded-full hover:scale-105">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-emerald-400 transition-colors ml-auto rounded-lg hover:bg-emerald-500/10"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-emerald-500/20 py-4 space-y-3 bg-black/50 backdrop-blur-lg">
            {/* Mobile Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-emerald-500/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] rounded-lg transition-all"
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all text-left ${
                      location.pathname === link.href
                        ? "bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                    }`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-emerald-500/20" />

            {/* Mobile Auth Actions */}
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link to="/repositories/new" className="block">
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all rounded-full flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Add Project
                  </button>
                </Link>

                <Link to="/profile/me" className="block">
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-2.5 border border-emerald-500/30 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all rounded-lg text-sm flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile & Wallet
                  </button>
                </Link>

                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2.5 border border-red-500/30 text-gray-300 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/5 transition-all rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-2.5 text-gray-300 hover:text-emerald-400 text-sm font-medium transition-all rounded-lg hover:bg-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40"
                  >
                    Sign in
                  </button>
                </Link>
                <Link to="/signup" className="block">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-3 bg-white text-black text-sm font-semibold hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all rounded-full"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}