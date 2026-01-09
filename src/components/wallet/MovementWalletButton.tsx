// MovementWalletButton.tsx
import { useMovementWallet } from '@/hooks/useMovementWallet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function MovementWalletButton() {
  const { account, connected, wallets, connect, disconnect } = useMovementWallet();
  const [copied, setCopied] = useState(false);

  // Get address as string
  const address = account?.address?.toString() ?? null;

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Copy address to clipboard
  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (connected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10">
            <Wallet className="w-4 h-4" />
            {formatAddress(address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
          <DropdownMenuLabel className="text-gray-400">Movement Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem 
            onClick={copyAddress}
            className="hover:bg-white/10 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Address
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem 
            onClick={() => disconnect()}
            className="hover:bg-white/10 cursor-pointer text-red-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
        <DropdownMenuLabel className="text-gray-400">Select Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <DropdownMenuItem
              key={wallet.name}
              onClick={() => connect(wallet.name)}
              className="hover:bg-white/10 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {wallet.icon && (
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-5 h-5"
                  />
                )}
                <span>{wallet.name}</span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled className="text-gray-500">
            No wallets detected. Please install Petra or Razor wallet.
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}