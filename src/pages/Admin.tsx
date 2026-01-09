import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import {
  Search,
  Check,
  X,
  Eye,
  Star,
  Trash2,
  Shield,
  Users,
  GitFork,
  TrendingUp,
} from "lucide-react";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  // Fetch all projects
  const { projects, isLoading } = useProjects({ limit: 100 });

  const stats = [
    { label: "Total Repos", value: projects.length.toString(), icon: GitFork },
    { label: "Pending Review", value: projects.filter(p => !p.isPublished).length.toString(), icon: Shield },
    { label: "Total Users", value: "0", icon: Users },
    { label: "Featured", value: projects.filter(p => p.isFeatured).length.toString(), icon: TrendingUp },
  ];

  // Map projects to admin format
  const pendingRepos = projects.map((project) => ({
    id: project._id,
    name: project.title,
    slug: project.slug,
    previewImage: project.previewImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    status: project.isPublished ? "approved" : "pending",
    featured: project.isFeatured,
    author: {
      name: project.ownerName,
    },
    submittedAt: new Date(project.createdAt).toLocaleDateString(),
  }));

  const filteredRepos = pendingRepos.filter((repo) => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || repo.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      {/* Background with dark green to black gradient */}
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#050A08] to-black">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            </div>
            <p className="text-gray-400">
              Manage repositories, users, and platform settings
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="p-4 mb-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className={filter === f 
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white border-0" 
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Repository List */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Repository Queue</h2>
            </div>
            {isLoading ? (
              <div className="p-12 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                No repositories found
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredRepos.map((repo) => (
                <div key={repo.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                  <img
                    src={repo.previewImage}
                    alt={repo.name}
                    className="w-16 h-12 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{repo.name}</h3>
                      <Badge
                        variant={
                          repo.status === "approved"
                            ? "tech"
                            : repo.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          repo.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : repo.status === "rejected"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-white/10 text-gray-300 border-white/20"
                        }
                      >
                        {repo.status}
                      </Badge>
                      {repo.featured && (
                        <Badge className="bg-white/10 text-gray-300 border-white/20">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      by {repo.author.name} • Submitted {repo.submittedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon-sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {repo.status === "pending" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon-sm" 
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon-sm" 
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon-sm"
                      className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon-sm" 
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;