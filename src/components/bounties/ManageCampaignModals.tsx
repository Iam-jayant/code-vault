import React, { useState } from "react";
import { X, Eye, Edit3 } from "lucide-react";

export default function ManageCampaignModal({ bounty, onClose }) {
  const [activeTab, setActiveTab] = useState("submissions"); // submissions, edit
  
    if (!bounty) return null;
  
    // Mock submissions
    const submissions = [
      { id: 1, team: "Alpha Devs", status: "Reviewing", repo: "github.com/alpha/repo", date: "2 days ago" },
      { id: 2, team: "Solo Coder", status: "Rejected", repo: "github.com/solo/repo", date: "5 days ago" },
      { id: 3, team: "Web3 Wizards", status: "Shortlisted", repo: "github.com/web3/repo", date: "1 week ago" },
    ];
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
         
         <div className="relative bg-[#13131a] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in">
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#181820]">
              <div>
                  <h2 className="text-xl font-bold text-white">Manage Campaign</h2>
                  <p className="text-sm text-gray-400 mt-1">{bounty.title}</p>
              </div>
              <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
            </div>
  
            {/* Tabs */}
            <div className="px-6 pt-4 border-b border-white/5 bg-[#181820]/50 flex gap-6">
                <button 
                  onClick={() => setActiveTab("submissions")}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "submissions" ? "text-indigo-400 border-indigo-500" : "text-gray-400 border-transparent hover:text-white"}`}
                >
                  Submissions ({submissions.length})
                </button>
                <button 
                  onClick={() => setActiveTab("edit")}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "edit" ? "text-indigo-400 border-indigo-500" : "text-gray-400 border-transparent hover:text-white"}`}
                >
                  Edit Campaign
                </button>
            </div>
  
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0f]">
              {activeTab === "submissions" ? (
                  <div className="space-y-4">
                      {submissions.map((sub) => (
                          <div key={sub.id} className="bg-[#13131a] border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-white/10 transition">
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                                      {sub.team.charAt(0)}
                                  </div>
                                  <div>
                                      <h4 className="font-semibold text-white">{sub.team}</h4>
                                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                          <span>{sub.date}</span>
                                          <a href={`https://${sub.repo}`} className="hover:text-indigo-400 hover:underline">View Repo</a>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-3">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                      sub.status === 'Shortlisted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                      sub.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                  }`}>
                                      {sub.status}
                                  </span>
                                  <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="View Details">
                                      <Eye className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-20 text-gray-500">
                      <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Edit functionality would go here (pre-filled form).</p>
                  </div>
              )}
            </div>
         </div>
      </div>
    );
}
