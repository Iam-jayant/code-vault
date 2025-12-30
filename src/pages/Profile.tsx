import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { RepositoryCard, mockRepositories } from "@/components/repository";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Mail,
  GitFork,
  ExternalLink,
} from "lucide-react";

const Profile = () => {
  const { username } = useParams();

  // Mock user data
  const user = {
    name: "Alex Chen",
    username: username || "alexchen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "Full-stack developer passionate about building beautiful, functional web applications. Creator of Next.js SaaS Starter Kit and other open-source projects.",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    email: "alex@example.com",
    joinedDate: "January 2023",
    stats: {
      projects: 12,
      stars: 4500,
      forks: 890,
      followers: 1200,
    },
  };

  const userRepos = mockRepositories.filter(
    (r) => r.author.username === username || r.author.username === "alexchen"
  );

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-sm p-6 sticky top-24">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm pointer-events-none" />
                
                <div className="relative">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-sm border-2 border-neutral-700 mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-white text-black text-xs font-medium rounded-sm">
                        Pro
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="text-center mb-6">
                    <h1 className="font-heading text-2xl font-bold text-white">{user.name}</h1>
                    <p className="text-neutral-400">@{user.username}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-neutral-400 mb-6">{user.bio}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mb-6">
                    <button className="flex-1 px-4 py-2 bg-white text-black font-medium hover:bg-neutral-200 transition-colors rounded-sm text-sm">
                      Follow
                    </button>
                    <button className="px-4 py-2 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors rounded-sm">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="space-y-3 text-sm">
                    {user.location && (
                      <div className="flex items-center gap-2 text-neutral-400">
                        <MapPin className="w-4 h-4" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>{user.website.replace("https://", "")}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joinedDate}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-800">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">
                        {user.stats.projects}
                      </p>
                      <p className="text-xs text-neutral-400">Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">
                        {user.stats.followers.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-400">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">
                        {user.stats.stars.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-400">Stars</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">
                        {user.stats.forks.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-400">Forks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex items-center gap-4 mb-6 border-b border-neutral-800 pb-4">
                <button className="px-4 py-2 text-white font-medium border-b-2 border-white -mb-[17px] transition-colors">
                  Projects
                  <span className="ml-2 px-2 py-0.5 bg-neutral-800 text-white text-xs rounded-sm">
                    {userRepos.length}
                  </span>
                </button>
                <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">
                  Stars
                  <span className="ml-2 px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded-sm">
                    {user.stats.stars}
                  </span>
                </button>
                <button className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">
                  Forks
                  <span className="ml-2 px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded-sm">
                    {user.stats.forks}
                  </span>
                </button>
              </div>

              {/* Projects Grid */}
              {userRepos.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {userRepos.map((repo) => (
                    <RepositoryCard key={repo.id} repository={repo} />
                  ))}
                </div>
              ) : (
                <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-sm p-12 text-center">
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm pointer-events-none" />
                  
                  <div className="relative">
                    <div className="w-16 h-16 rounded-sm bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <GitFork className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">
                      No projects yet
                    </h3>
                    <p className="text-neutral-400">
                      This user hasn't uploaded any projects yet.
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
