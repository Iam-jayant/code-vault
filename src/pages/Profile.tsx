import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { RepositoryCard } from "@/components/repository";
import { MovementWalletButton } from "@/components/wallet";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Mail,
  GitFork,
  ExternalLink,
  Wallet,
  ChevronDown,
  ChevronUp,
  Eye,
  Star,
  MessageSquare,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMovementWallet } from "@/hooks/useMovementWallet";
import { useProjects } from "@/hooks/useProjects";

const Profile = () => {
  const { username } = useParams();
  const { isAuthenticated } = useAuth();
  const { address, connected } = useMovementWallet();
  const [showWallet, setShowWallet] = useState(false);

  const walletAddress = address;

  const { projects: userProjects, isLoading: isLoadingProjects } = useProjects({
    owner: walletAddress || undefined,
    autoFetch: !!walletAddress,
  });

  const user = {
    name: walletAddress 
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
      : "User",
    username: username || "me",
    avatar: walletAddress 
      ? `https://api.dicebear.com/7.x/identicon/svg?seed=${walletAddress}` 
      : "https://api.dicebear.com/7.x/initials/svg?seed=User",
    bio: "Developer on CodeVault marketplace",
    location: "",
    website: "",
    email: "",
    joinedDate: "2024",
    stats: {
      projects: userProjects.length,
      stars: userProjects.reduce((acc, p) => acc + p.stars, 0),
      forks: userProjects.reduce((acc, p) => acc + p.forks, 0),
      followers: 0,
    },
  };

  const truncateAddress = (addr: string | null) => {
    if (!addr) return 'Not connected';
    const addrStr = String(addr);
    return `${addrStr.slice(0, 6)}...${addrStr.slice(-4)}`;
  };

  const isOwnProfile = isAuthenticated && (!username || username === "me");

  const dashboardStats = [
    { label: "Total Views", value: userProjects.reduce((acc, p) => acc + p.downloads, 0).toLocaleString(), change: "+12%", icon: Eye },
    { label: "Total Stars", value: user.stats.stars.toLocaleString(), change: "+8%", icon: Star },
    { label: "Fork Requests", value: user.stats.forks.toLocaleString(), change: "+5%", icon: GitFork },
    { label: "Projects", value: user.stats.projects.toString(), change: "+1", icon: MessageSquare },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 sticky top-24 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />
                
                <div className="relative">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-2xl border-2 border-emerald-500/30 mx-auto object-cover bg-neutral-900 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    />
                    {isOwnProfile && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black text-xs font-semibold rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Pro
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-center mb-6">
                    <h1 className="font-heading text-2xl font-bold text-white">{user.name}</h1>
                    <p className="text-gray-400">@{user.username}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-400 mb-6">{user.bio}</p>

                  {/* Actions */}
                  {!isOwnProfile && (
                    <div className="flex gap-2 mb-6">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-semibold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all rounded-full">
                        Follow
                      </button>
                      <button className="px-4 py-2 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all rounded-full">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Wallet Button */}
                  {isOwnProfile && walletAddress && (
                    <button
                      onClick={() => setShowWallet(!showWallet)}
                      className="w-full flex items-center justify-between p-3 mb-6 bg-neutral-900/50 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <div className="text-left">
                          <p className="text-xs text-gray-400">Wallet</p>
                          <p className="text-sm font-mono text-white">
                            {truncateAddress(walletAddress)}
                          </p>
                        </div>
                      </div>
                      {showWallet ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  )}

                  {/* Info */}
                  <div className="space-y-3 text-sm">
                    {user.location && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>{user.website.replace("https://", "")}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>Joined {user.joinedDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/20">
                    <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xl font-bold text-emerald-400">
                        {user.stats.projects}
                      </p>
                      <p className="text-xs text-gray-400">Projects</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xl font-bold text-emerald-400">
                        {user.stats.followers.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">Followers</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xl font-bold text-emerald-400">
                        {user.stats.stars.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">Stars</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xl font-bold text-emerald-400">
                        {user.stats.forks.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">Forks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Wallet Section */}
              {showWallet && isOwnProfile && connected && (
                <div className="relative bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-heading text-white flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-emerald-400" />
                        Movement Wallet
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                        <p className="text-white font-mono text-sm break-all">{walletAddress}</p>
                      </div>
                      <p className="text-sm text-gray-400">
                        Use the "Connect Wallet" button in the navbar to manage your Movement wallet.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              {isOwnProfile && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {dashboardStats.map((stat) => (
                    <div key={stat.label} className="relative bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <stat.icon className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1 border border-emerald-500/20">
                            <TrendingUp className="w-3 h-3" />
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-xl font-bold text-white mb-0.5">{stat.value}</p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tabs */}
              <div className="flex items-center gap-4 mb-6 border-b border-emerald-500/20 pb-4">
                <button className="px-4 py-2 text-emerald-400 font-medium border-b-2 border-emerald-400 -mb-[17px] transition-all shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
                  Projects
                  <span className="ml-2 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                    {userProjects.length}
                  </span>
                </button>
                <button className="px-4 py-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  Stars
                  <span className="ml-2 px-2 py-0.5 bg-neutral-900 text-gray-400 text-xs rounded-full border border-emerald-500/20">
                    {user.stats.stars}
                  </span>
                </button>
                <button className="px-4 py-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  Forks
                  <span className="ml-2 px-2 py-0.5 bg-neutral-900 text-gray-400 text-xs rounded-full border border-emerald-500/20">
                    {user.stats.forks}
                  </span>
                </button>
              </div>

              {/* Projects Grid */}
              {isLoadingProjects ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : userProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {userProjects.map((project) => (
                    <RepositoryCard key={project._id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="relative bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />
                  
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <GitFork className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">
                      No projects yet
                    </h3>
                    <p className="text-gray-400">
                      {isOwnProfile 
                        ? "You haven't uploaded any projects yet. Add your first project!"
                        : "This user hasn't uploaded any projects yet."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;