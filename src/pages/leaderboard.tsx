import React, { useState } from "react";
import {
  Trophy,
  Award,
  Download,
  PhoneCall,
  Star,
  Crown,
  TrendingUp,
  Search,
  DollarSign,
} from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function LeaderboardPage() {
  const [search, setSearch] = useState("");

  const builders = [
    {
      id: 1,
      name: "Astra Labs",
      avatar: "https://placehold.co/80x80",
      title: "Full-Stack Product Studio",
      earnings: 18340,
      downloads: 12492,
      calls: 74,
      wins: 12,
      rank: 1,
      badge: "Top Earning Team",
    },
    {
      id: 2,
      name: "Neon Architect",
      avatar: "https://placehold.co/80x80",
      title: "AI Systems Engineer",
      earnings: 14200,
      downloads: 8193,
      calls: 46,
      wins: 9,
      rank: 2,
      badge: "AI Specialist",
    },
    {
      id: 3,
      name: "Orbit Studio",
      avatar: "https://placehold.co/80x80",
      title: "Frontend & UX",
      earnings: 11890,
      downloads: 6630,
      calls: 28,
      wins: 7,
      rank: 3,
      badge: "Design Excellence",
    },
    {
      id: 4,
      name: "Sentinel Dev",
      avatar: "https://placehold.co/80x80",
      title: "Security & Blockchain",
      earnings: 9600,
      downloads: 4421,
      calls: 18,
      wins: 6,
      rank: 4,
      badge: "Security Veteran",
    },
    {
      id: 5,
      name: "Polarwave",
      avatar: "https://placehold.co/80x80",
      title: "Backend + Infra",
      earnings: 7300,
      downloads: 3922,
      calls: 12,
      wins: 4,
      rank: 5,
      badge: "Scalability Expert",
    },
  ];

  const filtered = builders.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-100">
        <Header />
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* HEADER */}
        <header className="mb-14">
          <div className="flex items-center gap-3 text-indigo-400 font-medium mb-3">
            <Trophy className="w-5 h-5" />
            <span>Builder Leaderboard</span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Top Performing Product Builders
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed">
            Ranked by verified earnings, product traction, and successful
            campaign deliveries. These builders consistently ship
            production-ready products companies actually use.
          </p>

          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search builder name..."
              className="w-full bg-[#0B0B14] border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none"
            />
          </div>
        </header>

        {/* TABLE */}
        <div className="space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-[#0B0B14] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center gap-6">
                
                {/* RANK */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-xl">
                  {b.rank}
                </div>

                {/* PROFILE */}
                <img
                  src={b.avatar}
                  className="w-14 h-14 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{b.name}</h3>

                    {b.rank === 1 && (
                      <Crown className="text-yellow-400" />
                    )}
                  </div>

                  <p className="text-gray-400 text-sm">{b.title}</p>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="px-3 py-1 text-xs bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300">
                      {b.badge}
                    </span>
                  </div>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-4 gap-10 text-center">

                  <Metric
                    icon={<DollarSign className="w-5 h-5" />}
                    label="Earnings"
                    value={`$${b.earnings.toLocaleString()}`}
                  />

                  <Metric
                    icon={<Download className="w-5 h-5" />}
                    label="Downloads"
                    value={b.downloads.toLocaleString()}
                  />

                  <Metric
                    icon={<PhoneCall className="w-5 h-5" />}
                    label="Booked Calls"
                    value={b.calls}
                  />

                  <Metric
                    icon={<Award className="w-5 h-5" />}
                    label="Bounties Won"
                    value={b.wins}
                  />

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-16 text-gray-500 text-sm">
          Rankings update automatically based on verified payouts and usage data.
        </div>
      </div>
    </div>
  );
}


function Metric({ icon, label, value }) {
  return (
    <div>
      <div className="flex justify-center mb-1 text-gray-400">
        {icon}
      </div>
      <div className="font-bold">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}
