import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import Input from "./Input";
import TextArea from "./TextArea";

export default function LaunchCampaignModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
      title: "",
      reward: "",
      duration: "",
      category: "",
      difficulty: "Intermediate",
      overview: "",
      objective: ""
    });
  
    const update = (f, v) => setForm({ ...form, [f]: v });
  
    const handleSubmit = () => {
      // In a real app, validation and API call would go here
      onCreate(form);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />
  
        <div className="relative bg-[#13131a] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#181820]">
              <div>
                  <h2 className="text-xl font-bold text-white">Launch New Campaign</h2>
                  <p className="text-xs text-gray-400 mt-1">Define your bounty and find the best builders.</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition">
                  <X className="w-5 h-5" />
              </button>
          </div>
  
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <Input label="Campaign Title" placeholder="e.g. Build a Decentralized Exchange Interface" onChange={(v) => update("title", v)} value={form.title} />
              
              <div className="grid grid-cols-2 gap-4">
                  <Input label="Reward Pool (USDC/Tokens)" placeholder="e.g. 5,000 USDC" onChange={(v) => update("reward", v)} value={form.reward} />
                  <Input label="Duration" placeholder="e.g. 4 Weeks" onChange={(v) => update("duration", v)} value={form.duration} />
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                  <Input label="Category" placeholder="e.g. DeFi, AI, Infrastructure" onChange={(v) => update("category", v)} value={form.category} />
                  <div>
                       <label className="block mb-1.5 text-sm font-medium text-gray-400">Difficulty</label>
                       <select 
                          className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          onChange={(e) => update("difficulty", e.target.value)}
                          value={form.difficulty}
                       >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Senior">Senior</option>
                          <option value="Expert">Expert</option>
                       </select>
                  </div>
              </div>
  
              <TextArea
                  label="Campaign Overview"
                  placeholder="Describe the problem you are solving and context..."
                  onChange={(v) => update("overview", v)}
                  value={form.overview}
              />
  
              <TextArea
                  label="Key Objective"
                  placeholder="What is the definition of done? What must be built?"
                  onChange={(v) => update("objective", v)}
                  value={form.objective}
              />
              
              {/* Note: In a full implementation, you'd add dynamic lists for deliverables, expectations, etc. */}
          </div>
  
          <div className="p-6 border-t border-white/10 bg-[#181820] flex justify-end gap-3">
               <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                  Cancel
               </button>
              <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 transition-all">
                  <Plus className="w-4 h-4" />
                  Launch Campaign
              </button>
          </div>
        </div>
      </div>
    );
}
