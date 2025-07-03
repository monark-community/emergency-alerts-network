import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, MapPin, Shield, Users, X, Phone, User, Wallet, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import EmergencyButton from '@/components/EmergencyButton';
import ResponderMap from '@/components/ResponderMap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DemoModeProps {
  onExit: () => void;
  userLocation: {lat: number, lng: number} | null;
  nearbyResponders: any[];
  activeAlert: any;
  onEmergencyTrigger: () => void;
  userReputation: number;
}

interface TimelineEvent {
  id: string;
  type: 'alert' | 'emergency' | 'responder' | 'arrival';
  title: string;
  description: string;
  timestamp: Date;
  avatar?: string;
}

const DemoMode = ({ 
  onExit, 
  userLocation, 
  nearbyResponders, 
  activeAlert, 
  onEmergencyTrigger,
  userReputation 
}: DemoModeProps) => {
  const [showResponderPin, setShowResponderPin] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showDemoBanner, setShowDemoBanner] = useState(true);
  const [alertSent, setAlertSent] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const emergencyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const responderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock wallet data for demo
  const mockWallet = {
    username: "Alex_Guardian",
    address: "0x742d35Cc6634C0532925a3b8D9c6C05Ae5c74324"
  };

  const addTimelineEvent = (event: Omit<TimelineEvent, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setTimelineEvents(prev => [newEvent, ...prev]);
  };

  const handleSendAlert = () => {
    setAlertSent(true);
    
    addTimelineEvent({
      type: 'alert',
      title: 'Alert sent! 🚨',
      description: 'Your emergency alert has been sent. Emergency services will be contacted shortly.',
      timestamp: new Date()
    });

    console.log('Demo alert sent');
  };

  const clearAllTimeouts = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (emergencyTimeoutRef.current) {
      clearTimeout(emergencyTimeoutRef.current);
      emergencyTimeoutRef.current = null;
    }
    if (responderTimeoutRef.current) {
      clearTimeout(responderTimeoutRef.current);
      responderTimeoutRef.current = null;
    }
  };

  const showResponderNotifications = () => {
    addTimelineEvent({
      type: 'responder',
      title: '🚨 Verified Responder On The Way!',
      description: 'Marcus J. is 2 minutes away and heading to your location. Your location has been shared with the verified responder.',
      timestamp: new Date(),
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    });
    
    setShowResponderPin(true);
    
    // Show responder arrival 5 seconds after responder notification
    responderTimeoutRef.current = setTimeout(() => {
      addTimelineEvent({
        type: 'arrival',
        title: '✅ Responder Has Arrived',
        description: 'Marcus J. has arrived at your location and is ready to assist.',
        timestamp: new Date(),
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      });
    }, 5000);
  };

  useEffect(() => {
    if (activeAlert && activeAlert.status === 'demo' && alertSent) {
      // Show emergency services dialog immediately after alert is sent
      setShowEmergencyDialog(true);
      setCountdown(10);

      // Start countdown
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current!);
            countdownIntervalRef.current = null;
            setShowEmergencyDialog(false);
            
            // Emergency services contacted at T+10 seconds
            addTimelineEvent({
              type: 'emergency',
              title: '🚨 Emergency Services Contacted',
              description: 'Police and ambulance have been notified and are on their way. Your location has been shared with emergency services. Nearby responders have also been alerted.',
              timestamp: new Date()
            });
            
            // Show responder notification 5 seconds after emergency services (T+15 seconds)
            emergencyTimeoutRef.current = setTimeout(() => {
              showResponderNotifications();
            }, 5000);
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearAllTimeouts();
      };
    }
  }, [activeAlert, alertSent]);

  const handleCancelEmergencyServices = () => {
    clearAllTimeouts();
    setShowEmergencyDialog(false);
    
    addTimelineEvent({
      type: 'alert',
      title: 'Emergency Services Cancelled',
      description: 'Emergency services will not be contacted. Showing nearby responders instead.',
      timestamp: new Date()
    });

    // Show responder notifications immediately (2 seconds after cancel)
    emergencyTimeoutRef.current = setTimeout(() => {
      showResponderNotifications();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 z-50 overflow-auto flex flex-col w-full">
      {/* Persistent Demo Banner */}
      {showDemoBanner && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white px-4 py-3 flex items-center justify-between z-[60] shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <p className="font-medium">🎯 Demo Mode Active - Experience the Guardian emergency response system</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-white hover:bg-blue-500 hover:text-white h-8 px-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Header */}
      <header className={`bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0 w-full ${showDemoBanner ? 'mt-12' : ''}`}>
        <div className="flex items-center justify-between w-full max-w-none mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 emergency-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Guardian</h1>
              <p className="text-sm text-gray-600">Community Emergency Response - Demo Mode</p>
            </div>
          </div>
          
          {/* User Menu */}
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
              <DropdownMenuItem onClick={onExit}>
                <X className="w-4 h-4 mr-2" />
                Exit Demo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="w-full p-4 space-y-6 flex-1 flex flex-col">
        {/* Demo Banner - Only show if persistent banner is dismissed */}
        {!showDemoBanner && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center flex-shrink-0">
            <p className="text-blue-800 font-medium">🎯 Demo Mode Active - Experience the Guardian emergency response system</p>
          </div>
        )}

        {/* Nearby Responders Card */}
        <div className="grid grid-cols-1 gap-4 flex-shrink-0">
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
        </div>

        {/* Emergency Button Section with Map as Background */}
        <Card className="border-2 border-emergency-200 relative overflow-hidden flex-1 flex flex-col">
          {/* Map as Background */}
          <div className="absolute inset-0">
            <ResponderMap 
              userLocation={userLocation}
              responders={showResponderPin ? nearbyResponders.map((responder, index) => 
                index === 0 ? { ...responder, responding: true } : responder
              ) : []}
              activeAlert={activeAlert}
              onRespondToAlert={() => {}}
            />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 bg-white/95 backdrop-blur-sm flex-1 flex flex-col">
            <CardHeader className="text-center flex-shrink-0">
              <CardTitle className="text-2xl text-gray-900">Emergency Response Center</CardTitle>
              <p className="text-gray-600">
                {!alertSent ? "Press the button below if you need immediate assistance" : "Emergency services will be contacted automatically"}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 flex-1 justify-center">
              {/* Emergency Services Dialog - Integrated into card */}
              {showEmergencyDialog && (
                <div className="w-full max-w-md animate-fade-in">
                  <Card className="border-red-300 bg-red-50">
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Phone className="w-8 h-8 text-red-600" />
                        <AlertCircle className="w-8 h-8 text-red-600 animate-pulse" />
                      </div>
                      <CardTitle className="text-red-800">Contact Emergency Services?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-red-700">
                        Emergency services will be contacted automatically in:
                      </p>
                      <div className="text-4xl font-bold text-red-600">
                        {countdown}
                      </div>
                      <Button 
                        onClick={handleCancelEmergencyServices}
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100"
                      >
                        Cancel - Don't Contact Emergency Services
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!showEmergencyDialog && (
                <>
                  {!alertSent ? (
                    <EmergencyButton 
                      onTrigger={handleSendAlert}
                      isActive={false}
                      disabled={false}
                      showSendAlert={true}
                    />
                  ) : (
                    <EmergencyButton 
                      onTrigger={onEmergencyTrigger}
                      isActive={!!activeAlert}
                      disabled={false}
                    />
                  )}
                  
                  {/* Only show Demo Alert Active card if alert has been sent */}
                  {activeAlert && alertSent && (
                    <div className="animate-fade-in w-full max-w-md space-y-4">
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
                      
                      {/* Event Timeline */}
                      {timelineEvents.length > 0 && (
                        <Card className="border-gray-200 bg-white">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <Clock className="w-5 h-5" />
                              <span>Event Timeline</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                            {timelineEvents.map((event, index) => (
                              <div key={event.id} className="animate-fade-in">
                                <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                                  {event.avatar ? (
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                      <AvatarImage 
                                        src={event.avatar} 
                                        alt="Responder"
                                        className="object-cover"
                                      />
                                      <AvatarFallback>R</AvatarFallback>
                                    </Avatar>
                                  ) : (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      event.type === 'emergency' ? 'bg-red-100' :
                                      event.type === 'responder' ? 'bg-blue-100' :
                                      event.type === 'arrival' ? 'bg-green-100' :
                                      'bg-orange-100'
                                    }`}>
                                      {event.type === 'emergency' ? <Phone className="w-4 h-4 text-red-600" /> :
                                       event.type === 'responder' ? <Users className="w-4 h-4 text-blue-600" /> :
                                       event.type === 'arrival' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                                       <AlertCircle className="w-4 h-4 text-orange-600" />}
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                                    <p className="text-gray-600 text-xs mt-1">{event.description}</p>
                                    <p className="text-gray-400 text-xs mt-1">{event.timestamp.toLocaleTimeString()}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DemoMode;
