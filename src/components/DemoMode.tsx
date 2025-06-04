
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, MapPin, Shield, Users, CheckCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import EmergencyButton from '@/components/EmergencyButton';
import ResponderMap from '@/components/ResponderMap';
import ReputationDisplay from '@/components/ReputationDisplay';

interface DemoModeProps {
  onExit: () => void;
  userLocation: {lat: number, lng: number} | null;
  nearbyResponders: any[];
  activeAlert: any;
  onEmergencyTrigger: () => void;
  userReputation: number;
}

const DemoMode = ({ 
  onExit, 
  userLocation, 
  nearbyResponders, 
  activeAlert, 
  onEmergencyTrigger,
  userReputation 
}: DemoModeProps) => {
  const [showExitButton, setShowExitButton] = useState(false);

  useEffect(() => {
    // Show exit button after responder notification + 3 seconds
    if (activeAlert && activeAlert.status === 'demo') {
      const timer = setTimeout(() => {
        // First show the responder notification
        toast({
          title: "🚨 Verified Responder On The Way!",
          description: "Marcus J. is 2 minutes away and heading to your location.",
          className: "border-safe-500 bg-safe-50"
        });
        
        // Then show exit button after 3 more seconds
        setTimeout(() => {
          setShowExitButton(true);
        }, 3000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeAlert]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 z-50 overflow-auto">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 emergency-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Guardian</h1>
              <p className="text-sm text-gray-600">Community Emergency Response - Demo Mode</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onExit}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Demo Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800 font-medium">🎯 Demo Mode Active - Experience the Guardian emergency response system</p>
        </div>

        {/* Status Cards */}
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

        {/* Emergency Button Section */}
        <Card className="border-2 border-emergency-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Emergency Response Center</CardTitle>
            <p className="text-gray-600">Press the button below if you need immediate assistance</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <EmergencyButton 
              onTrigger={onEmergencyTrigger}
              isActive={!!activeAlert}
              disabled={false}
            />
            
            {activeAlert && (
              <div className="animate-fade-in w-full max-w-md">
                <Card className="border-blue-300 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">Demo Alert Active</p>
                        <p className="text-sm text-blue-600">
                          Demo started at {activeAlert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {showExitButton && (
              <div className="animate-fade-in">
                <Button 
                  onClick={onExit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Exit Demo Mode
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

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
              onRespondToAlert={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoMode;
