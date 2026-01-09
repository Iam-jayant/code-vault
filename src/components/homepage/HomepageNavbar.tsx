import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Plus, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { MovementWalletButton } from "@/components/wallet";

/**
 * HomepageNavbar - AkshayaVault themed navigation bar
 * 
 * Features:
 * - Dark green to black gradient background
 * - Emerald green accents
 * - layR logo image
 * - Search input with emerald focus states
 * - Sign in/Register buttons with emerald styling
 * - Profile, Wallet, Logout (when authenticated)
 * - Mobile-responsive with collapsible menu
 */
export function HomepageNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#0A0F0D] to-black border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="CodeVault.png" 
              alt="CodeVault" 
              className="h-6 md:h-7 w-auto"
            />
          </Link>

          {/* Search Bar - Center-right area (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 justify-end">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects"
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 rounded-lg transition-all"
              />
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/repositories/new">
                  <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </Link>

                <Link to="/profile/me">
                  <button className="p-2 text-gray-300 hover:text-emerald-400 transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                </Link>

                <MovementWalletButton />

                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-emerald-500/30 transition-colors rounded-lg text-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-emerald-400 text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-emerald-400 transition-colors"
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
          <div className="md:hidden border-t border-white/10 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 rounded-lg transition-all"
              />
            </div>

            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link to="/repositories/new" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </Link>
                <Link to="/profile/me" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg text-sm flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                </Link>
                <div className="w-full">
                  <MovementWalletButton />
                </div>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2.5 border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-emerald-400 text-sm font-medium transition-colors py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors rounded-lg text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default HomepageNavbar;