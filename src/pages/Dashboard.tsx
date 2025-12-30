import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { mockRepositories } from "@/components/repository";
import {
  Plus,
  GitFork,
  MessageSquare,
  TrendingUp,
  Eye,
  Star,
  ArrowRight,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  const userRepos = mockRepositories.slice(0, 3);

  const stats = [
    { label: "Total Views", value: "12,432", change: "+12%", icon: Eye },
    { label: "Total Stars", value: "847", change: "+8%", icon: Star },
    { label: "Fork Requests", value: "23", change: "+5%", icon: GitFork },
    { label: "Messages", value: "12", change: "+3", icon: MessageSquare },
  ];

  const recentActivity = [
    { type: "star", user: "johndoe", repo: "Next.js SaaS Starter Kit", time: "2 hours ago" },
    { type: "fork", user: "sarahm", repo: "React Dashboard Pro", time: "5 hours ago" },
    { type: "message", user: "mikeb", repo: "E-Commerce Platform", time: "1 day ago" },
    { type: "star", user: "lisaa", repo: "AI Chatbot Template", time: "2 days ago" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-neutral-400 text-sm sm:text-base">
                Welcome back! Here's what's happening with your projects.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/settings">
                <button className="px-4 py-2 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors rounded-sm flex items-center gap-2 text-sm">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </Link>
              <Link to="/repositories/new">
                <button className="px-4 py-2 bg-white text-black font-medium hover:bg-neutral-200 transition-colors rounded-sm flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-sm p-4 sm:p-6">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm pointer-events-none" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="px-2 py-1 bg-white/10 text-white text-xs font-medium rounded-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* My Projects */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white">My Projects</h2>
                <Link to="/repositories">
                  <button className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              <div className="space-y-4">
                {userRepos.map((repo) => (
                  <div key={repo.id} className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-sm p-4 hover:border-neutral-700 transition-all">
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm pointer-events-none" />
                    
                    <div className="relative flex items-start gap-4">
                      <img
                        src={repo.previewImage}
                        alt={repo.name}
                        className="w-20 h-14 rounded-sm object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/repository/${repo.slug}`}
                          className="font-heading font-semibold text-white hover:text-neutral-300 transition-colors"
                        >
                          {repo.name}
                        </Link>
                        <p className="text-sm text-neutral-400 line-clamp-1 mt-1">
                          {repo.shortDescription}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-sm text-neutral-400">
                            <Star className="w-4 h-4" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-neutral-400">
                            <GitFork className="w-4 h-4" />
                            {repo.forks}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-neutral-400">
                            <Eye className="w-4 h-4" />
                            {repo.downloads}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors rounded-sm text-sm flex-shrink-0">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                Recent Activity
              </h2>
              <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-sm p-4">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-sm pointer-events-none" />
                
                <div className="relative space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-4 border-b border-neutral-800 last:border-0 last:pb-0"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === "star"
                            ? "bg-white/10 text-white"
                            : activity.type === "fork"
                            ? "bg-white/10 text-white"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {activity.type === "star" && <Star className="w-4 h-4" />}
                        {activity.type === "fork" && <GitFork className="w-4 h-4" />}
                        {activity.type === "message" && <MessageSquare className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-300">
                          <span className="font-medium text-white">{activity.user}</span>
                          {activity.type === "star" && " starred "}
                          {activity.type === "fork" && " requested fork for "}
                          {activity.type === "message" && " sent a message about "}
                          <span className="text-white">{activity.repo}</span>
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mt-8 mb-4 sm:mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link to="/repositories/new" className="block">
                  <button className="w-full px-4 py-3 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors rounded-sm flex items-center gap-3 text-sm">
                    <Plus className="w-4 h-4" />
                    Add New Project
                  </button>
                </Link>
                <Link to="/profile/me" className="block">
                  <button className="w-full px-4 py-3 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors rounded-sm flex items-center gap-3 text-sm">
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
