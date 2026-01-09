import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/dashboard';

export default function Dashboard() {
  const { isAuthenticated, userId, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#050A08] to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but no userId, show loading (registration in progress)
  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F0D] via-[#050A08] to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  return <DashboardLayout userId={userId} />;
}