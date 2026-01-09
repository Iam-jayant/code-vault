import { UserProfile as UserProfileType } from '@/lib/api';
import { Calendar, Mail, Wallet, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileProps {
  profile: UserProfileType;
}

/**
 * UserProfile component displays user information including name, email, avatar, join date,
 * and wallet connection status separately.
 * 
 * Requirements: 3.1 - Display user profile with wallet status shown separately
 */
export function UserProfile({ profile }: UserProfileProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-emerald-500/30">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-lg">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-sm text-gray-400">User ID: {profile._id.slice(0, 8)}...</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs text-gray-400">Member Since</p>
              <p className="text-sm">{formatDate(profile.createdAt)}</p>
            </div>
          </div>

          {/* Wallet Connection Status - Shown Separately */}
          <div className="flex items-center gap-3 text-gray-300">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-400">Wallet Status</p>
              {profile.walletAddress ? (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Connected
                  </Badge>
                  <p className="text-xs font-mono text-gray-400">
                    {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
                  </p>
                </div>
              ) : (
                <Badge variant="outline" className="bg-white/5 text-gray-400 border-white/10 mt-1">
                  Not Connected
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400">
            Your wallet is used for payments only and does not affect your profile identity.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}