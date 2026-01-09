import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomepageNavbar } from "@/components/homepage";
import { ArrowRight, Loader2, Check, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/contexts/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, ready, login } = useAuth();
  const { userId, isRegistering } = useUser();

  // Redirect authenticated users with userId to dashboard
  useEffect(() => {
    if (ready && isAuthenticated && userId && !isRegistering) {
      navigate("/dashboard");
    }
  }, [ready, isAuthenticated, userId, isRegistering, navigate]);

  const handleSignup = () => {
    login(); // Privy handles both login and signup flows
  };

  const benefits = [
    "Unlimited repository uploads",
    "Advanced analytics dashboard",
    "Priority customer support",
  ];

  // Show loading state while Privy initializes or user is registering
  if (!ready || isRegistering) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <HomepageNavbar />
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative z-10">
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
            <span>{isRegistering ? 'Creating your account...' : 'Loading...'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <HomepageNavbar />

        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:py-16 md:py-20">
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Benefits */}
            <div className="hidden md:block">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
                Start sharing your code today
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Join thousands of developers who are already showcasing their work
                on layR.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signup Card - Glass/Fluid Style */}
            <div className="relative bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />

              {/* Glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-500/20 rounded-2xl blur-sm -z-10" />

              {/* Content */}
              <div className="relative">
                <div className="text-center mb-8">
                  <Link to="/" className="inline-block mb-6 group">
                    <img
                      src="CodeVault.png"
                      alt="CodeVault"
                      className="h-8 w-auto mx-auto transition-all group-hover:brightness-125 group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                    />
                  </Link>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                    Create your account
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Get started for free, no credit card required
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02]"
                  disabled={isLoading}
                  onClick={handleSignup}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-400 mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;