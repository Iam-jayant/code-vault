import { usePrivy, User as PrivyUser } from '@privy-io/react-auth';

/**
 * Return type for the useAuth hook
 */
export interface UseAuthReturn {
  /** Whether the user is currently authenticated */
  isAuthenticated: boolean;
  /** Whether Privy is still initializing */
  isLoading: boolean;
  /** Whether Privy has finished initializing and auth state is reliable */
  ready: boolean;
  /** The authenticated Privy user object, or null if not authenticated */
  user: PrivyUser | null;
  /** The user's embedded wallet address, or null if not authenticated */
  walletAddress: string | null;
  /** Function to trigger the Privy login modal */
  login: () => void;
  /** Function to log out the current user */
  logout: () => Promise<void>;
}

/**
 * Custom authentication hook that wraps Privy's usePrivy hook.
 * Provides access to authentication state and the user's embedded wallet address.
 * 
 * @returns {UseAuthReturn} Authentication state and methods
 * 
 * @example
 * ```tsx
 * const { isAuthenticated, walletAddress, login, logout } = useAuth();
 * 
 * if (isAuthenticated) {
 *   console.log('Wallet:', walletAddress);
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Extract embedded wallet address from user object
  // Privy creates embedded wallets with walletClientType: 'privy'
  const walletAddress = user?.wallet?.address ?? null;

  return {
    isAuthenticated: authenticated,
    isLoading: !ready,
    ready,
    user: user ?? null,
    walletAddress,
    login,
    logout,
  };
}

export default useAuth;
