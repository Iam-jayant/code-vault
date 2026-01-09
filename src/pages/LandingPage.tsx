import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Code, Shield, Trophy, Zap, Search, Coins, User, LogOut, LayoutDashboard } from "lucide-react";
import { MinimalFooter } from "@/components/homepage";
import { useAuth } from "@/hooks/useAuth";

// Hand-drawn arrow SVG component
const DoodleArrow = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 50"
        className={`w-24 h-12 text-yellow-400 ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10,25 Q50,5 90,25" />
        <path d="M90,25 L80,15" />
        <path d="M90,25 L80,35" />
    </svg>
);

// Hand-drawn circle SVG component
const DoodleCircle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <div className={`relative inline-block ${className}`}>
        <svg
            viewBox="0 0 200 60"
            className="absolute -inset-2 w-[110%] h-[120%] text-emerald-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="none"
        >
            <path d="M10,30 Q100,5 190,30 Q100,55 10,30 M15,32 Q100,60 185,28" />
        </svg>
        <span className="relative z-10 font-bold">{children}</span>
    </div>
);

const LandingPage = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#050A08] text-white flex flex-col font-sans selection:bg-emerald-500/30">

            {/* Navbar Minimal */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform -rotate-3">
                            <Code className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">CodeVault</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                                <Link to="/profile/me" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-400 transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                                <Link to="/repositories/new" className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-all text-sm transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                    New Project
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Login</Link>
                                <Link to="/signup" className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-all text-sm transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#050A08] to-[#050A08] pointer-events-none z-0" />

                <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">

                        {/* Handwriting Note Top Left */}
                        <div className="hidden lg:block absolute top-20 left-10 transform -rotate-12 animate-pulse-slow">
                            <div className="font-['Patrick_Hand'] text-yellow-400 text-2xl max-w-[150px] leading-tight">
                                Stop rewriting the same code!
                                <DoodleArrow className="transform rotate-90 scale-75 mt-2 ml-4 text-yellow-400/80" />
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
                            <Zap className="w-3 h-3" />
                            <span>The Marketplace for Premium Code</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
                            Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Repositories</span>
                            <br />
                            into <DoodleCircle className="text-white">Revenue</DoodleCircle>
                        </h1>

                        {/* Subtext */}
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Buy and sell production-ready codebases. Skip the setup, start building,
                            and monetize your side projects securely on the blockchain.
                        </p>

                        {/* Handwriting Note Right */}
                        <div className="hidden lg:block absolute bottom-40 right-10 transform rotate-6">
                            <div className="font-['Patrick_Hand'] text-pink-400 text-2xl max-w-[200px] leading-tight text-center">
                                <span className="text-4xl block mb-2">🔒</span>
                                Escrow protected payments!
                                <svg className="w-full h-10 text-pink-400/50 mt-1" viewBox="0 0 100 20" fill="none" stroke="currentColor">
                                    <path d="M5,15 Q50,5 95,15" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Action Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

                            {/* Card 1: Explore */}
                            <Link to="/repositories" className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Search className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Explore Code</h3>
                                <p className="text-sm text-gray-400">Find boilersplates, UI kits, and full stack apps.</p>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5 text-emerald-400" />
                                </div>
                            </Link>

                            {/* Card 2: Bounties */}
                            <Link to="/bounties" className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all text-left">
                                <div className="absolute -top-3 -right-3 transform rotate-12 z-20">
                                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow-lg font-['Patrick_Hand'] text-base border-2 border-black">New!</span>
                                </div>
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Trophy className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Bounties</h3>
                                <p className="text-sm text-gray-400">Solve issues, earn crypto, and build reputation.</p>
                            </Link>

                            {/* Card 3: Sell */}
                            <Link to="/repositories/new" className="group relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-500/50 hover:bg-pink-500/5 transition-all text-left">
                                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Coins className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Sell Code</h3>
                                <p className="text-sm text-gray-400">Monetize your unused projects and templates.</p>
                            </Link>
                        </div>

                        <div className="mt-16 text-center">
                            <p className="text-gray-500 text-sm font-['Patrick_Hand'] text-xl">
                                Trusted by devs only <span className="inline-block transform translate-y-2 ml-2">🚀</span>
                            </p>
                        </div>

                    </div>
                </div>

                {/* How It Works Section */}
                <div className="relative py-24 bg-black/50 border-y border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-emerald-400 font-['Patrick_Hand'] text-xl mb-2 block">Simple Flow</span>
                            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                How CodeVault Works
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent border-t-2 border-dashed border-emerald-500/30 -z-10" />

                            {/* Step 1 */}
                            <div className="text-center group">
                                <div className="w-24 h-24 mx-auto bg-emerald-900/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 text-black font-bold rounded-lg flex items-center justify-center font-['Patrick_Hand'] text-xl">1</div>
                                    <Search className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Discover</h3>
                                <p className="text-gray-400  leading-relaxed">Browse verified codebases or post a bounty for what you need.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center group">
                                <div className="w-24 h-24 mx-auto bg-blue-900/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-black font-bold rounded-lg flex items-center justify-center font-['Patrick_Hand'] text-xl">2</div>
                                    <Coins className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Transact</h3>
                                <p className="text-gray-400 leading-relaxed">Secure payment via smart contracts. Funds are locked until you verify.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center group">
                                <div className="w-24 h-24 mx-auto bg-purple-900/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-500 text-black font-bold rounded-lg flex items-center justify-center font-['Patrick_Hand'] text-xl">3</div>
                                    <Code className="w-10 h-10 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Build</h3>
                                <p className="text-gray-400 leading-relaxed">Get clean, documented code and start building your product immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="py-24 relative overflow-hidden">
                    {/* Decorative Doodles */}
                    <div className="absolute top-20 left-10 opacity-20 transform -rotate-12 pointer-events-none">
                        <DoodleCircle className="w-32 h-32 text-gray-600">
                            <span />
                        </DoodleCircle>
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                            <div>
                                <span className="text-purple-400 font-['Patrick_Hand'] text-xl mb-2 block">Why Choose Us?</span>
                                <h2 className="text-4xl font-bold mb-6">Built by developers,<br />for developers</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                            <Shield className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">Escrow Security</h3>
                                            <p className="text-gray-400">Your funds are safe. Payments are only released when the deliverables meet the requirements.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">Instant Delivery</h3>
                                            <p className="text-gray-400">Automated repository access immediately after purchase confirmation.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                                            <Trophy className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">Quality Guaranteed</h3>
                                            <p className="text-gray-400">All repositories are vetted for code quality, documentation, and functionality.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Side */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />
                                <div className="bg-black/80 border border-white/10 rounded-2xl p-6 relative">
                                    <div className="absolute -top-6 -right-6 transform rotate-6 bg-yellow-400 text-black px-4 py-2 font-['Patrick_Hand'] font-bold text-lg shadow-xl z-20">
                                        Top Rated!
                                    </div>
                                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
                                            <div className="space-y-2">
                                                <div className="w-24 h-3 bg-gray-700 rounded animate-pulse" />
                                                <div className="w-16 h-2 bg-gray-700 rounded animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="text-emerald-400 font-mono">Verified ✓</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="w-full h-24 bg-gray-800/50 rounded-lg animate-pulse" />
                                        <div className="w-3/4 h-4 bg-gray-800/50 rounded animate-pulse" />
                                        <div className="w-1/2 h-4 bg-gray-800/50 rounded animate-pulse" />
                                    </div>

                                    {/* Floating elements */}
                                    <div className="absolute bottom-4 right-4 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-400 font-mono">
                                        +100 MOVE
                                    </div>
                                </div>

                                {/* Handwriting Note */}
                                <div className="absolute -bottom-10 -left-10 font-['Patrick_Hand'] text-gray-400 transform -rotate-6">
                                    <ArrowRight className="w-6 h-6 inline-block transform rotate-[135deg] mb-2 mr-2" />
                                    Real-time contract verification
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/30 rounded-3xl p-12 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Ship?</h2>
                                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                                    Stop starting from scratch. Join the marketplace and safe weeks of development time.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/repositories" className="px-8 py-4 bg-emerald-500 text-black font-bold text-lg rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105">
                                        Explore Repositories
                                    </Link>
                                    <Link to="/signup" className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all border border-white/10 hover:scale-105">
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <MinimalFooter />
        </div>
    );
};

export default LandingPage;
