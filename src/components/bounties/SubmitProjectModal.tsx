import React, { useState } from "react";
import { X, Send } from "lucide-react";
import Input from "./Input";
import TextArea from "./TextArea";

export default function SubmitProjectModal({ onClose }) {
  const [form, setForm] = useState({});
  const update = (f, v) => setForm({ ...form, [f]: v });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={onClose}
          />
    
          <div className="relative bg-[#13131a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#181820]">
                <h2 className="text-xl font-bold text-white">Submit Implementation</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition">
                    <X className="w-5 h-5" />
                </button>
            </div>
    
            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Your Name / Team" placeholder="e.g. Satoshi Studios" onChange={(v) => update("name", v)} value={undefined} />
                    <Input label="Contact Email" placeholder="you@example.com" onChange={(v) => update("email", v)} value={undefined} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Repository URL" placeholder="github.com/..." onChange={(v) => update("repo", v)} value={undefined} />
                    <Input label="Live Demo URL" placeholder="https://..." onChange={(v) => update("demo", v)} value={undefined} />
                </div>
    
                <TextArea
                      label="Product Overview"
                      placeholder="Briefly describe what you built in 2-3 sentences..."
                      onChange={(v) => update("overview", v)} value={undefined}                />
    
                <TextArea
                      label="Technical Architecture"
                      placeholder="What stack did you use? Any key architectural decisions?"
                      onChange={(v) => update("architecture", v)} value={undefined}                />
    
                <TextArea
                      label="Security Considerations"
                      placeholder="How did you handle auth, data validation, etc?"
                      onChange={(v) => update("security", v)} value={undefined}                />
    
                 <TextArea
                      label="Hiring / Contract Interest"
                      placeholder="Are you open to a full-time role or contract with the company?"
                      onChange={(v) => update("interest", v)} value={undefined}                />
            </div>
    
            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#181820]">
                <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all hover:scale-[1.01]">
                    <Send className="w-4 h-4" />
                    Submit Project
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                    By submitting, you agree to the campaign terms.
                </p>
            </div>
          </div>
        </div>
  );
}
