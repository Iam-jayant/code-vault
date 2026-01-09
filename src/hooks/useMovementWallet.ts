import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useCallback, useEffect, useRef } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Hook for Movement wallet operations
 * Wraps Aptos wallet adapter for Movement-specific functionality
 * Automatically syncs wallet address to backend when connected
 */
export function useMovementWallet() {
  const {
    account,
    connected,
    wallet,
    wallets,
    connect,
    disconnect,
    signAndSubmitTransaction,
    signMessage,
    network,
  } = useWallet();

  // Track if we've synced to avoid duplicate calls
  const hasSynced = useRef(false);

  // Get Movement wallet address - handle various formats
  // Aptos addresses can be strings or objects with toString()
  let address: string | null = null;
  if (account?.address) {
    if (typeof account.address === 'string') {
      address = account.address;
    } else if (typeof account.address === 'object' && 'toString' in account.address) {
      address = account.address.toString();
    } else {
      address = String(account.address);
    }
  }

  // Auto-sync wallet address to backend when connected
  useEffect(() => {
    const syncWalletToBackend = async () => {
      // Skip if already synced this session
      if (hasSynced.current) {
        return;
      }

      // Get userId from localStorage
      const storedUserId = localStorage.getItem('layR_userId');

      // Skip if missing requirements
      if (!connected || !address || !storedUserId) {
        return;
      }

      // Mark as synced immediately to prevent duplicate calls
      hasSynced.current = true;

      try {
        console.log('[useMovementWallet] Syncing wallet to backend:', address);

        const response = await fetch(`${API_BASE}/api/users/${storedUserId}/wallet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[useMovementWallet] Wallet synced successfully:', data);

          // Update localStorage with fresh profile data
          if (data.success && data.profile) {
            localStorage.setItem('layR_userProfile', JSON.stringify(data.profile));
          }
        } else {
          console.warn('[useMovementWallet] Failed to sync wallet:', await response.text());
        }
      } catch (error) {
        console.error('[useMovementWallet] Error syncing wallet:', error);
      }
    };

    syncWalletToBackend();
  }, [connected, address]);

  // Reset sync flag when disconnected
  useEffect(() => {
    if (!connected) {
      hasSynced.current = false;
    }
  }, [connected]);

  // Connect to a specific wallet
  const connectWallet = useCallback(async (walletName: string) => {
    try {
      await connect(walletName);
      return { success: true };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }, [connect]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
      return { success: true };
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Disconnection failed',
      };
    }
  }, [disconnect]);

  // Send MOVE tokens
  const sendTransaction = useCallback(async (
    recipientAddress: string,
    amount: number // in MOVE (not smallest units)
  ) => {
    if (!connected || !address) {
      return {
        success: false,
        error: 'Wallet not connected',
      };
    }

    try {
      // Convert MOVE to smallest units (8 decimals)
      const amountInSmallestUnits = Math.floor(amount * 1e8);

      // Sign and submit transaction
      const response = await signAndSubmitTransaction({
        data: {
          function: '0x1::aptos_account::transfer',
          typeArguments: [],
          functionArguments: [recipientAddress, amountInSmallestUnits],
        },
      });

      return {
        success: true,
        txHash: response.hash,
      };
    } catch (error) {
      console.error('Transaction failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transaction failed',
      };
    }
  }, [connected, address, signAndSubmitTransaction]);

  return {
    // Wallet info
    account,
    address,
    connected,
    wallet,
    wallets,
    network,

    // Actions
    connect: connectWallet,
    disconnect: disconnectWallet,
    sendTransaction,
    signMessage,
    signAndSubmitTransaction,
  };
}

export default useMovementWallet;

