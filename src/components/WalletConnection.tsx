
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: (connected: boolean) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ isConnected, onConnect }) => {
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
      <div className="flex items-center space-x-3">
        <Badge variant="secondary" className="bg-safe-100 text-safe-800 border-safe-300">
          <CheckCircle className="w-4 h-4 mr-1" />
          Connected
        </Badge>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDisconnect}
          className="text-gray-600"
        >
          Disconnect
        </Button>
      </div>
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
