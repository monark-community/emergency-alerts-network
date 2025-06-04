
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Shield, Users, Wallet, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import EmergencyButton from '@/components/EmergencyButton';
import ResponderMap from '@/components/ResponderMap';
import WalletConnection from '@/components/WalletConnection';
import AlertHistory from '@/components/AlertHistory';
import ReputationDisplay from '@/components/ReputationDisplay';
import HeroSection from '@/components/HeroSection';
import SocialProof from '@/components/SocialProof';
import DemoMode from '@/components/DemoMode';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [activeAlert, setActiveAlert] = useState<any>(null);
  const [nearbyResponders, setNearbyResponders] = useState([
    { id: 1, location: { lat: 40.7128, lng: -74.0060 }, reputation: 92, responding: false },
    { id: 2, location: { lat: 40.7130, lng: -74.0058 }, reputation: 78, responding: false },
    { id: 3, location: { lat: 40.7126, lng: -74.0062 }, reputation: 95, responding: false },
    { id: 4, location: { lat: 40.7132, lng: -74.0056 }, reputation: 83, responding: false }
  ]);
  const [userReputation, setUserReputation] = useState(85);
  const emergencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          
          // Update nearby responders based on actual user location
          const mockResponders = [
            { id: 1, location: { lat: newLocation.lat + 0.001, lng: newLocation.lng + 0.001 }, reputation: 92, responding: false },
            { id: 2, location: { lat: newLocation.lat - 0.0015, lng: newLocation.lng + 0.0008 }, reputation: 78, responding: false },
            { id: 3, location: { lat: newLocation.lat + 0.0008, lng: newLocation.lng - 0.0012 }, reputation: 95, responding: false },
            { id: 4, location: { lat: newLocation.lat - 0.0005, lng: newLocation.lng - 0.0018 }, reputation: 83, responding: false }
          ];
          setNearbyResponders(mockResponders);
          console.log('User location obtained:', position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location access needed",
            description: "Please enable location services for emergency features.",
            variant: "destructive"
          });
        }
      );
    }
  }, []);

  const handleEmergencyTrigger = async () => {
    if (!isDemoMode && !isConnected) {
      toast({
        title: "Connect wallet first",
        description: "You need to connect your wallet to trigger alerts.",
        variant: "destructive"
      });
      return;
    }

    if (!userLocation) {
      toast({
        title: "Location required",
        description: "Location access is needed to send emergency alerts.",
        variant: "destructive"
      });
      return;
    }

    const newAlert = {
      id: Date.now(),
      location: userLocation,
      timestamp: new Date(),
      status: isDemoMode ? 'demo' : 'active',
      type: 'emergency'
    };

    setActiveAlert(newAlert);
    
    // Update responders to show some are responding
    setNearbyResponders(prev => prev.map((responder, index) => 
      index < 2 ? { ...responder, responding: true } : responder
    ));

    toast({
      title: "Emergency alert sent! 🚨",
      description: "Nearby responders have been notified. Help is on the way.",
      className: "border-emergency-500"
    });

    console.log('Emergency alert triggered:', newAlert);
  };

  const handleRespondToAlert = (alertId: number) => {
    if (!isConnected) {
      toast({
        title: "Connect wallet to respond",
        description: "Wallet connection required to respond to alerts.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Response confirmed ✅",
      description: "You're on your way to help. Stay safe!",
      className: "border-safe-500"
    });
    
    console.log('Responding to alert:', alertId);
  };

  const handleTryDemo = () => {
    setIsDemoMode(true);
    
    toast({
      title: "Demo Mode Activated! 🎯",
      description: "This is how the emergency system works. Experience the full Guardian response.",
      className: "border-blue-500"
    });
    
    // Simulate demo alert
    const demoAlert = {
      id: Date.now(),
      location: userLocation || { lat: 40.7128, lng: -74.0060 },
      timestamp: new Date(),
      status: 'demo',
      type: 'emergency'
    };
    
    setActiveAlert(demoAlert);
    console.log('Demo mode activated:', demoAlert);
  };

  const handleExitDemo = () => {
    setIsDemoMode(false);
    setActiveAlert(null);
    setNearbyResponders(prev => prev.map(responder => ({ ...responder, responding: false })));
    
    toast({
      title: "Demo Mode Ended",
      description: "Connect your wallet to access real emergency features.",
      className: "border-gray-500"
    });
  };

  if (isDemoMode) {
    return (
      <DemoMode
        onExit={handleExitDemo}
        userLocation={userLocation}
        nearbyResponders={nearbyResponders}
        activeAlert={activeAlert}
        onEmergencyTrigger={handleEmergencyTrigger}
        userReputation={userReputation}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 emergency-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Guardian</h1>
              <p className="text-sm text-gray-600">Community Emergency Response</p>
            </div>
          </div>
          <WalletConnection isConnected={isConnected} onConnect={setIsConnected} />
        </div>
      </header>

      {/* Hero Section - Only show for non-connected users */}
      {!isConnected && (
        <HeroSection 
          onConnectWallet={() => setIsConnected(true)} 
          onTryDemo={handleTryDemo}
        />
      )}

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Status Cards - Only show for connected users */}
        {isConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-safe-200 bg-safe-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-safe-600" />
                  <div>
                    <p className="text-sm font-medium text-safe-800">Status</p>
                    <p className="text-lg font-bold text-safe-600">Safe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Nearby Responders</p>
                    <p className="text-lg font-bold text-blue-600">{nearbyResponders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ReputationDisplay reputation={userReputation} />
          </div>
        )}

        {/* Emergency Button Section */}
        <div ref={emergencyRef}>
          <Card className="border-2 border-emergency-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Emergency Response Center</CardTitle>
              <p className="text-gray-600">Press the button below if you need immediate assistance</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <EmergencyButton 
                onTrigger={handleEmergencyTrigger}
                isActive={!!activeAlert}
                disabled={!isConnected || !userLocation}
              />
              
              {activeAlert && (
                <div className="animate-fade-in w-full max-w-md">
                  <Card className={`border-emergency-300 ${activeAlert.status === 'demo' ? 'bg-blue-50' : 'bg-emergency-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className={`w-6 h-6 ${activeAlert.status === 'demo' ? 'text-blue-600' : 'text-emergency-600 animate-pulse-emergency'}`} />
                        <div>
                          <p className={`font-semibold ${activeAlert.status === 'demo' ? 'text-blue-800' : 'text-emergency-800'}`}>
                            {activeAlert.status === 'demo' ? 'Demo Alert Active' : 'Active Emergency Alert'}
                          </p>
                          <p className={`text-sm ${activeAlert.status === 'demo' ? 'text-blue-600' : 'text-emergency-600'}`}>
                            {activeAlert.status === 'demo' ? 'Demo started at' : 'Sent at'} {activeAlert.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {!isConnected && (
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Wallet className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-yellow-800 font-medium">Connect your wallet to enable emergency features</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Nearby Responders & Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponderMap 
              userLocation={userLocation}
              responders={nearbyResponders}
              activeAlert={activeAlert}
              onRespondToAlert={handleRespondToAlert}
            />
          </CardContent>
        </Card>

        {/* Alert History - Only show for connected users */}
        {isConnected && <AlertHistory />}
      </div>

      {/* Social Proof Section - Only show for non-connected users */}
      {!isConnected && <SocialProof />}
    </div>
  );
};

export default Index;
