import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import BountyCard from "../components/bounties/BountyCard";
import BountyModal from "../components/bounties/BountyModal";
import SubmitProjectModal from "../components/bounties/SubmitProjectModal";
import LaunchCampaignModal from "../components/bounties/LaunchCampaignModal";
import ManageCampaignModal from "../components/bounties/ManageCampaignModals";
import { Header } from "@/components/layout";

export default function BountiesPage() {
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showLaunch, setShowLaunch] = useState(false);
  const [managedBounty, setManagedBounty] = useState(null);
  const [viewMode, setViewMode] = useState("explore"); // "explore" or "my-campaigns"

  // Mock Data
const initialBounties = [
    {
      id: 1,
      company: "Orion Systems",
      logo: "O",
      color: "from-blue-500 to-cyan-500",
      title: "Internal AI Knowledge Assistant",
      reward: "3,500 USDC",
      duration: "6 Weeks",
      applicants: 92,
      difficulty: "Senior",
      category: "AI & Infrastructure",
      tags: ["Python", "Vector DB", "LLM"],
      overview: "Orion Systems needs a production-grade internal AI assistant.",
      objective: "Build a polished, reliable internal tool. Not a prototype.",
      expectations: ["Intuitive chat interface", "SSO Authentication"],
      deliverables: ["Deployed Application", "Dockerized Containers"],
      evaluation: ["UX Polish", "Code Quality"],
      prize: "Winner takes 3,500 USDC.",
      ownership: "Developer retains IP unless acquired.",
      ownerId: "user-123" 
    },
    {
      id: 2,
      company: "Nebula Protocol",
      logo: "N",
      color: "from-purple-500 to-pink-500",
      title: "DeFi Dashboard UI Redesign",
      reward: "1,200 USDC",
      duration: "2 Weeks",
      applicants: 45,
      difficulty: "Intermediate",
      category: "Frontend & Design",
      tags: ["React", "Tailwind"],
      overview: "Redesign our staking interface.",
      objective: "Create a visually stunning interface.",
      expectations: ["Mobile-first"],
      deliverables: ["Figma", "React Code"],
      evaluation: ["Visual Impact"],
      prize: "1,200 USDC",
      ownership: "Full IP transfer.",
      ownerId: "other-user"
    },
    {
      id: 3,
      company: "SentinelX",
      logo: "S",
      color: "from-emerald-500 to-green-500",
      title: "Smart Contract Security Audit Tool",
      reward: "5,000 USDC",
      duration: "4 Weeks",
      applicants: 12,
      difficulty: "Expert",
      category: "Security & Blockchain",
      tags: ["Solidity", "Rust", "Security"],
      overview: "Build a CLI tool that static analyzes Solidity contracts.",
      objective: "Automate the first pass of our security auditing process.",
      expectations: ["Zero false positives ideally"],
      deliverables: ["CLI Tool Source Code", "Test Suite"],
      evaluation: ["Detection Accuracy", "Performance"],
      prize: "5,000 USDC",
      ownership: "Open Source (MIT License).",
      ownerId: "other-user"
    },
    {
      id: 4,
      company: "PixelForge",
      logo: "P",
      color: "from-orange-500 to-red-500",
      title: "Generative Art Engine",
      reward: "2,000 USDC",
      duration: "3 Weeks",
      applicants: 156,
      difficulty: "Intermediate",
      category: "Creative Tech",
      tags: ["Canvas API", "WebGL", "Node.js"],
      overview: "Create an engine that takes distinct PNG layers and generates 10,000 unique images.",
      objective: "High-performance art generation for an upcoming NFT drop.",
      expectations: ["Handle 4k resolution"],
      deliverables: ["Generation Script", "Metadata verifier"],
      evaluation: ["Speed", "Rarity logic accuracy"],
      prize: "2,000 USDC + 1 Whitelist spot",
      ownership: "Shared ownership.",
      ownerId: "user-123"
    },
    {
      id: 5,
      company: "QuantumLeap",
      logo: "Q",
      color: "from-teal-500 to-emerald-500",
      title: "Zero-Knowledge Proof Login System",
      reward: "8,000 USDC",
      duration: "8 Weeks",
      applicants: 28,
      difficulty: "Expert",
      category: "Cryptography & Auth",
      tags: ["Circom", "SnarkJS", "React"],
      overview: "Develop a ZK-based login system that allows users to prove ownership of an NFT.",
      objective: "Privacy-preserving authentication for our dApp suite.",
      expectations: ["Client-side proof generation"],
      deliverables: ["Circuit files", "Frontend SDK", "Verifier Contract"],
      evaluation: ["Security", "Proof generation time"],
      prize: "8,000 USDC + Audit credit",
      ownership: "Exclusive license.",
      ownerId: "other-user"
    },
    {
      id: 6,
      company: "EcoChain",
      logo: "E",
      color: "from-green-400 to-lime-500",
      title: "Carbon Credit Marketplace Indexer",
      reward: "2,500 USDC",
      duration: "3 Weeks",
      applicants: 55,
      difficulty: "Intermediate",
      category: "Backend & Data",
      tags: ["The Graph", "GraphQL", "PostgreSQL"],
      overview: "Build a subgraph or custom indexer to track carbon credit retirements.",
      objective: "Unified API for carbon data.",
      expectations: ["Real-time syncing", "Handle reorgs"],
      deliverables: ["Indexer code", "Hosted API endpoint"],
      evaluation: ["Data accuracy", "Uptime"],
      prize: "2,500 USDC",
      ownership: "Open Source.",
      ownerId: "user-123"
    },
     {
      id: 7,
      company: "MetaRealms",
      logo: "M",
      color: "from-pink-500 to-rose-500",
      title: "3D Asset Viewer for Web",
      reward: "1,800 USDC",
      duration: "2 Weeks",
      applicants: 34,
      difficulty: "Intermediate",
      category: "Frontend & 3D",
      tags: ["Three.js", "React Three Fiber"],
      overview: "A lightweight, drag-and-drop 3D viewer component for GLB/GLTF files.",
      objective: "Enhance our marketplace asset preview.",
      expectations: ["<200kb bundle size", "Mobile touch support"],
      deliverables: ["React Component", "NPM Package"],
      evaluation: ["Performance", "Visual fidelity"],
      prize: "1,800 USDC",
      ownership: "MIT License.",
      ownerId: "other-user"
    },
     {
      id: 8,
      company: "DataVault",
      logo: "D",
      color: "from-slate-500 to-gray-500",
      title: "Encrypted File Sharing Protocol",
      reward: "4,000 USDC",
      duration: "5 Weeks",
      applicants: 19,
      difficulty: "Senior",
      category: "Security & Storage",
      tags: ["IPFS", "PGP", "WebCrypto API"],
      overview: "Create a decentralized 'WeTransfer' where files are encrypted client-side.",
      objective: "Secure, ephemeral file sharing.",
      expectations: ["End-to-end encryption", "No backend logging"],
      deliverables: ["Web App", "Security Whitepaper"],
      evaluation: ["Penetration testing results"],
      prize: "4,000 USDC",
      ownership: "Shared IP.",
      ownerId: "other-user"
    }
  ];
  
  
  const [bounties, setBounties] = useState(initialBounties);

  const handleCreateCampaign = (newCampaign) => {
    const newId = bounties.length + 1;
    const campaignObj = {
        id: newId,
        company: "My Company", // Default for demo
        logo: "M",
        color: "from-indigo-500 to-purple-500",
        ...newCampaign,
        applicants: 0,
        tags: ["New"],
        ownerId: "user-123" // Current user ID
    };
    setBounties([campaignObj, ...bounties]);
    setViewMode("my-campaigns"); // Switch to my campaigns view
  };

  const filteredBounties = viewMode === "explore" 
    ? bounties 
    : bounties.filter(b => b.ownerId === "user-123");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans selection:bg-indigo-500/30">
        <Header />
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                {viewMode === "explore" ? "Explore Bounties" : "My Campaigns"}
              </h1>
              <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed">
                {viewMode === "explore" 
                    ? "Contribute to world-class engineering challenges. Ship real products, get paid in crypto."
                    : "Manage your active campaigns, review submissions, and find your next star engineer."}
              </p>
            </div>
            
            <div className="flex gap-4">
                <button 
                    onClick={() => setShowLaunch(true)}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Launch Campaign
                </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-10 border-b border-white/10 flex gap-8">
              <button 
                onClick={() => setViewMode("explore")}
                className={`pb-4 px-2 font-medium text-sm transition-all border-b-2 ${viewMode === "explore" ? "border-indigo-500 text-white" : "border-transparent text-gray-400 hover:text-white"}`}
              >
                Explore All
              </button>
              <button 
                onClick={() => setViewMode("my-campaigns")}
                className={`pb-4 px-2 font-medium text-sm transition-all border-b-2 ${viewMode === "my-campaigns" ? "border-indigo-500 text-white" : "border-transparent text-gray-400 hover:text-white"}`}
              >
                My Campaigns
              </button>
          </div>

          {/* Search Bar (Only for Explore mode usually, but useful for both) */}
          <div className="mt-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search bounties..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/10"
              />
            </div>
            <button className="px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center gap-2 font-medium">
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredBounties.length > 0 ? (
              filteredBounties.map((bounty) => (
                <BountyCard
                  key={bounty.id}
                  bounty={bounty}
                  isOwner={viewMode === "my-campaigns"} // Pass owner flag
                  onOpen={() => setSelectedBounty(bounty)}
                  onManage={() => setManagedBounty(bounty)} // Open management modal
                />
              ))
          ) : (
             <div className="col-span-2 text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <p className="text-gray-400 text-lg">No campaigns found.</p>
                {viewMode === "my-campaigns" && (
                    <button onClick={() => setShowLaunch(true)} className="mt-4 text-indigo-400 font-medium hover:underline">
                        Launch your first campaign &rarr;
                    </button>
                )}
             </div>
          )}
        </div>

        {/* Modals */}
        {selectedBounty && (
          <BountyModal
            bounty={selectedBounty}
            onClose={() => setSelectedBounty(null)}
            onSubmit={() => setShowSubmit(true)}
          />
        )}

        {showSubmit && (
          <SubmitProjectModal onClose={() => setShowSubmit(false)} />
        )}

        {showLaunch && (
          <LaunchCampaignModal 
            onClose={() => setShowLaunch(false)} 
            onCreate={handleCreateCampaign}
          />
        )}

        {managedBounty && (
            <ManageCampaignModal 
                bounty={managedBounty}
                onClose={() => setManagedBounty(null)}
            />
        )}
      </div>
    </div>
  );
}
