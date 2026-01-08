import React, { useEffect, useState } from "react";
import { X, Eye, Edit3, Trophy, CheckCircle } from "lucide-react";
import SubmissionDetailsModal from "./SubmissionDetailsModal";
import { useBountyContract } from "@/hooks/useBountyContract";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const OWNER_WALLET =
  "0x40a2387ea575b5e503d089e96bd69e49849cc121ed118970d8dd0b4f8954a947";

interface Submission {
  _id: string;
  TeamName: string;
  createdAt: string;
  RepositoryLink: string;
  userWallet: string;
  status: string;
}

interface Bounty {
  id: string;
  title: string;
  reward: string;
}

interface ManageCampaignModalProps {
  bounty: Bounty | null;
  onClose: () => void;
}

export default function ManageCampaignModal({ bounty, onClose }: ManageCampaignModalProps) {
  const [activeTab, setActiveTab] = useState("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const [rewardAmounts, setRewardAmounts] = useState<{ [key: string]: number }>({});
  const [distributing, setDistributing] = useState(false);

  const { distributeRewards, loading: contractLoading, error: contractError } = useBountyContract();
  const { account, signAndSubmitTransaction } = useWallet();

  useEffect(() => {
    if (!bounty) return;

    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/bounty/submissions?bountyId=${bounty.id}&walletAddress=${OWNER_WALLET}`
        );

        const json = await res.json();
        if (json?.data) setSubmissions(json.data);
      } catch (err) {
        console.error("Failed to load submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [bounty]);

  const toggleWinner = (submissionWallet: string) => {
    setSelectedWinners(prev => {
      if (prev.includes(submissionWallet)) {
        return prev.filter(w => w !== submissionWallet);
      } else {
        return [...prev, submissionWallet];
      }
    });
  };

  const updateRewardAmount = (wallet: string, amount: number) => {
    setRewardAmounts(prev => ({ ...prev, [wallet]: amount }));
  };

  const handleDistributeRewards = async () => {
    try {
      if (selectedWinners.length === 0) {
        alert("Please select at least one winner");
        return;
      }

      // Validate all winners have reward amounts
      for (const winner of selectedWinners) {
        if (!rewardAmounts[winner] || rewardAmounts[winner] <= 0) {
          alert(`Please set a valid reward amount for all winners`);
          return;
        }
      }

      setDistributing(true);

      // TODO: Get wallet from context/provider
      // const wallet = useWallet();

      const amounts = selectedWinners.map(w => rewardAmounts[w]);

      // Distribute on-chain (auto-transfers MOVE tokens to winners)
      if (!account) {
        alert("Please connect your wallet first");
        return;
      }

      const wallet = { signAndSubmitTransaction };
      const txHash = await distributeRewards(
        wallet,
        selectedWinners, // Winner addresses
        amounts // Reward amounts in MOVE
      );

      console.log("Rewards distributed on-chain:", txHash);
      
      alert(`✅ Rewards distributed successfully!\n\nTransaction: ${txHash}\n\n${selectedWinners.length} winners received their MOVE tokens.`);

      // After successful on-chain distribution, update submission statuses in database
      // for (const winner of selectedWinners) {
      //   await updateSubmissionStatus(winner, "winner");
      // }

    } catch (err: any) {
      console.error("Error distributing rewards:", err);
      alert("Failed to distribute rewards: " + (err?.message || "Unknown error"));
    } finally {
      setDistributing(false);
    }
  };

  if (!bounty) return null;

  const totalRewardSelected = selectedWinners.reduce((sum, w) => sum + (rewardAmounts[w] || 0), 0);
  const bountyReward = parseFloat(bounty.reward) || 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-[#13131a] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between bg-[#181820]">
            <div>
              <h2 className="text-xl font-bold">Manage Campaign</h2>
              <p className="text-sm text-gray-400">{bounty.title}</p>
              <p className="text-xs text-indigo-400 mt-1">Total Reward: {bounty.reward}</p>
            </div>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 border-b border-white/5 flex gap-6">
            <button
              onClick={() => setActiveTab("submissions")}
              className={`pb-3 border-b-2 ${activeTab === "submissions"
                ? "text-indigo-400 border-indigo-500"
                : "text-gray-400 border-transparent"
                }`}
            >
              Submissions ({submissions.length})
            </button>

            <button
              onClick={() => setActiveTab("edit")}
              className={`pb-3 border-b-2 ${activeTab === "edit"
                ? "text-indigo-400 border-indigo-500"
                : "text-gray-400 border-transparent"
                }`}
            >
              Edit Campaign
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#0a0a0f]">
            {activeTab === "submissions" && (
              <>
                {loading ? (
                  <p className="text-gray-400">Loading submissions...</p>
                ) : submissions.length === 0 ? (
                  <p className="text-gray-500 text-center py-20">
                    No submissions yet.
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {submissions.map((sub) => {
                        const isSelected = selectedWinners.includes(sub.userWallet);
                        return (
                          <div
                            key={sub._id}
                            className={`bg-[#13131a] border p-4 rounded-xl flex justify-between hover:border-white/10 ${isSelected ? "border-indigo-500" : "border-white/5"
                              }`}
                          >
                            <div className="flex gap-4 flex-1">
                              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400">
                                {sub.TeamName.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{sub.TeamName}</h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(sub.createdAt).toDateString()}
                                </p>
                                <a
                                  href={sub.RepositoryLink}
                                  target="_blank"
                                  className="text-xs text-indigo-400 hover:underline"
                                >
                                  View Repo
                                </a>
                                <p className="text-xs text-gray-600 mt-1">
                                  Wallet: {sub.userWallet}
                                </p>

                                {isSelected && (
                                  <div className="mt-2">
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      placeholder="Reward amount (MOVE)"
                                      value={rewardAmounts[sub.userWallet] || ""}
                                      onChange={(e) => updateRewardAmount(sub.userWallet, parseFloat(e.target.value))}
                                      className="bg-[#0a0a0f] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white w-48"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {sub.status}
                              </span>

                              <button
                                onClick={() => toggleWinner(sub.userWallet)}
                                className={`p-2 rounded-lg transition ${isSelected
                                  ? "bg-indigo-500 text-white"
                                  : "hover:bg-white/10 text-gray-400"
                                  }`}
                                title={isSelected ? "Remove from winners" : "Select as winner"}
                              >
                                {isSelected ? (
                                  <CheckCircle className="w-5 h-5" />
                                ) : (
                                  <Trophy className="w-5 h-5" />
                                )}
                              </button>

                              <button
                                onClick={() => setSelectedSubmission(sub)}
                                className="p-2 hover:bg-white/10 rounded-lg"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Distribution Summary */}
                    {selectedWinners.length > 0 && (
                      <div className="sticky bottom-0 bg-[#181820] border border-white/10 rounded-xl p-6 mt-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-bold text-lg">Distribution Summary</h3>
                            <p className="text-sm text-gray-400">
                              {selectedWinners.length} winner(s) selected
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Total Distribution</p>
                            <p className={`text-2xl font-bold ${totalRewardSelected > bountyReward ? "text-red-500" : "text-green-500"
                              }`}>
                              {totalRewardSelected.toFixed(2)} MOVE
                            </p>
                            <p className="text-xs text-gray-500">
                              of {bounty.reward} available
                            </p>
                          </div>
                        </div>

                        {totalRewardSelected > bountyReward && (
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                            <p className="text-red-400 text-sm">
                              ⚠️ Total distribution exceeds available reward pool
                            </p>
                          </div>
                        )}

                        <button
                          onClick={handleDistributeRewards}
                          disabled={distributing || contractLoading || totalRewardSelected > bountyReward}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                        >
                          <Trophy className="w-5 h-5" />
                          {distributing || contractLoading ? "Distributing..." : "Distribute Rewards On-Chain"}
                        </button>

                        {contractError && (
                          <p className="text-red-400 text-sm mt-2">{contractError}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {activeTab === "edit" && (
              <div className="text-center py-20 text-gray-500">
                <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                Edit campaign form goes here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selectedSubmission && (
        <SubmissionDetailsModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </>
  );
}
