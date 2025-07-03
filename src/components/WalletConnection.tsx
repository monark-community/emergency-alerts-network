
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle, User, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: (connected: boolean) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ isConnected, onConnect }) => {
  // Mock wallet data - in real app this would come from wallet connection
  const mockWallet = {
    username: "Alex_Guardian",
    address: "0x742d35Cc6634C0532925a3b8D9c6C05Ae5c74324"
  };

  const handleConnect = async () => {
    // Simulate wallet connection
    try {
      // In a real app, this would connect to MetaMask or other wallets
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConnect(true);
      toast({
        title: "Wallet connected! 🎉",
        description: "You can now send and respond to emergency alerts.",
        className: "border-safe-500"
      });
      console.log('Wallet connected successfully');
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Please try connecting your wallet again.",
        variant: "destructive"
      });
    }
  };

  const handleDisconnect = () => {
    onConnect(false);
    toast({
      title: "Wallet disconnected",
      description: "You've been safely disconnected.",
    });
  };

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{mockWallet.username}</p>
              <p className="text-xs text-gray-500">{mockWallet.address.slice(0, 6)}...{mockWallet.address.slice(-4)}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Wallet className="w-4 h-4 mr-2" />
            Wallet Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect}>
            <X className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={handleConnect} className="emergency-gradient text-white">
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnection;
