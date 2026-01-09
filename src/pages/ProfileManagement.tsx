import { useState } from 'react';
import { Layout } from '@/components/layout';
import { UserProfile, ProfileEditor, WalletConnection } from '@/components/profile';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, User, Wallet, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfileManagement() {
  const { isAuthenticated, userProfile, userId } = useAuth();
  const { registerUser } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Handle profile save
  const handleSaveProfile = async (updates: { name?: string; avatar?: string }) => {
    if (!userId) {
      toast({
        title: 'Error',
        description: 'User ID not found. Please log in again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();

      if (result.success) {
        const updatedProfile = { ...userProfile, ...updates };
        localStorage.setItem('layR_userProfile', JSON.stringify(updatedProfile));
        await registerUser();
        setIsEditing(false);
      } else {
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      throw error;
    }
  };

  const handleWalletConnected = async (address: string) => {
    console.log('Wallet connected:', address);
    await registerUser();
  };

  const handleWalletDisconnected = async () => {
    console.log('Wallet disconnected');
    await registerUser();
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <User className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
            <p className="text-gray-400">Please log in to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!userProfile) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Loading Profile...</h1>
            <p className="text-gray-400">Please wait while we load your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              Profile Management
            </h1>
            <p className="text-gray-400">
              Manage your profile information and wallet connection
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="view" className="space-y-6">
            <TabsList className="bg-neutral-950/80 border border-emerald-500/20 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger 
                value="view" 
                className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:shadow-[0_0_15px_rgba(16,185,129,0.2)] rounded-lg transition-all"
              >
                <User className="w-4 h-4 mr-2" />
                View Profile
              </TabsTrigger>
              <TabsTrigger 
                value="edit" 
                className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:shadow-[0_0_15px_rgba(16,185,129,0.2)] rounded-lg transition-all"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </TabsTrigger>
              <TabsTrigger 
                value="wallet" 
                className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:shadow-[0_0_15px_rgba(16,185,129,0.2)] rounded-lg transition-all"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Wallet
              </TabsTrigger>
            </TabsList>

            {/* View Profile Tab */}
            <TabsContent value="view" className="space-y-6">
              <UserProfile profile={userProfile} />
              
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] rounded-full font-semibold"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </TabsContent>

            {/* Edit Profile Tab */}
            <TabsContent value="edit" className="space-y-6">
              <ProfileEditor
                profile={userProfile}
                onSave={handleSaveProfile}
                onCancel={() => setIsEditing(false)}
              />
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-6">
              <WalletConnection
                onWalletConnected={handleWalletConnected}
                onWalletDisconnected={handleWalletDisconnected}
              />
            </TabsContent>
          </Tabs>

          {/* Info Section */}
          <div className="mt-8 p-6 bg-neutral-950/80 border border-emerald-500/20 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.1)] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                About Profile Management
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Your profile is based on your authentication (Google/Email), not your wallet</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Your wallet is used for payments only and can be connected/disconnected independently</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Connecting or disconnecting your wallet does not change your profile name or email</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>You can edit your name and avatar, but your email cannot be changed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}