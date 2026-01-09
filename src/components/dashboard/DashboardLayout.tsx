import { useState } from 'react';
import { Layout } from '@/components/layout';
import { DashboardStats } from './DashboardStats';
import { MyProjectsTab } from './MyProjectsTab';
import { MyPurchasesTab } from './MyPurchasesTab';
import { TransactionsTab } from './TransactionsTab';
import { LayoutDashboard, FolderGit2, ShoppingBag, ArrowLeftRight } from 'lucide-react';

interface DashboardLayoutProps {
  userId: string;
}

type TabId = 'overview' | 'my-projects' | 'purchases' | 'transactions';

interface Tab {
  id: TabId;
  label: string;
  icon: typeof LayoutDashboard;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'my-projects', label: 'My Projects', icon: FolderGit2 },
  { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
];

export function DashboardLayout({ userId }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                Welcome to your Dashboard
              </h2>
              <p className="text-gray-400">
                Manage your projects, track purchases, and view your transaction history
              </p>
            </div>
            
            {/* Quick Stats Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-lg pointer-events-none" />
                <div className="relative">
                  <h3 className="font-heading text-lg font-semibold text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('my-projects')}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-colors text-left"
                    >
                      <FolderGit2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">View My Projects</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('purchases')}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-colors text-left"
                    >
                      <ShoppingBag className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">View Purchases</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('transactions')}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-colors text-left"
                    >
                      <ArrowLeftRight className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">View Transactions</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-lg pointer-events-none" />
                <div className="relative">
                  <h3 className="font-heading text-lg font-semibold text-white mb-4">
                    Getting Started
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Upload your first project to start earning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Browse the marketplace to discover projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Connect your wallet to make purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Track your earnings in the transactions tab</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'my-projects':
        return <MyProjectsTab userId={userId} />;
      case 'purchases':
        return <MyPurchasesTab userId={userId} />;
      case 'transactions':
        return <TransactionsTab userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#050A08] to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar with Stats */}
            <div className="lg:col-span-1">
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 sticky top-24">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-lg pointer-events-none" />
                
                <div className="relative">
                  <h2 className="font-heading text-xl font-bold text-white mb-6">
                    Dashboard
                  </h2>
                  
                  {/* User Stats */}
                  <DashboardStats userId={userId} />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap
                        ${isActive 
                          ? 'bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/20' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}