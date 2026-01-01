import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { mockRepositories } from "@/components/repository";
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

  const stats = [
    { label: "Total Repos", value: "2,547", icon: GitFork },
    { label: "Pending Review", value: "23", icon: Shield },
    { label: "Total Users", value: "15,234", icon: Users },
    { label: "This Month", value: "+342", icon: TrendingUp },
  ];

  // Simulated pending repos
  // const pendingRepos = mockRepositories.map((repo, index) => ({
  //   ...repo,
  //   status: index % 3 === 0 ? "pending" : index % 3 === 1 ? "approved" : "rejected",
  //   submittedAt: "2 days ago",
  // }));

  // const filteredRepos = pendingRepos.filter((repo) => {
  //   const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesFilter = filter === "all" || repo.status === filter;
  //   return matchesSearch && matchesFilter;
  // });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground">
            Manage repositories, users, and platform settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "pending", "approved", "rejected"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Repository List */}
        
      </div>
    </Layout>
  );
};

export default Admin;
