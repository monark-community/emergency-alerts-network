import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, MapPin, Shield, Users, X, Phone, User, Wallet, Clock, CheckCircle, Play, StopCircle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  const [emergencyServicesCancelled, setEmergencyServicesCancelled] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const emergencyServicesCancelledRef = useRef(false);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const emergencyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const responderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Security question for demo
  const securityQuestion = "What is your mother's maiden name?";
  const correctAnswer = "Beth"; // Demo answer

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
      description: 'Your emergency alert has been sent. Local first responders will be contacted shortly.',
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
      
      // Only show first responder arrival if emergency services weren't cancelled
      setTimeout(() => {
        // Use ref to avoid stale closure
        if (!emergencyServicesCancelledRef.current) {
          addTimelineEvent({
            type: 'emergency',
            title: '🚑 Local First Responder Arrival',
            description: 'Local emergency medical technician has arrived on scene and is coordinating with Marcus.',
            timestamp: new Date()
          });
        }
      }, 3000);
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
            
            // Local First Responders contacted at T+10 seconds
            addTimelineEvent({
              type: 'emergency',
              title: '🚨 Local First Responders Contacted',
              description: 'Police and ambulance have been notified and are on their way. Your location has been shared with local first responders. Nearby responders have also been alerted.',
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
    setEmergencyServicesCancelled(true);
    emergencyServicesCancelledRef.current = true; // Update ref too
    
    addTimelineEvent({
      type: 'alert',
      title: 'Local First Responders Cancelled',
      description: 'Local first responders will not be contacted. Showing nearby responders instead.',
      timestamp: new Date()
    });

    // Show responder notifications immediately (2 seconds after cancel)
    emergencyTimeoutRef.current = setTimeout(() => {
      showResponderNotifications();
    }, 2000);
  };

  const handleCancelAlert = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancelAlert = () => {
    if (securityAnswer.toLowerCase().trim() === correctAnswer.toLowerCase()) {
      // Clear all timeouts and reset state
      clearAllTimeouts();
      setAlertSent(false);
      setShowResponderPin(false);
      setEmergencyServicesCancelled(false);
      emergencyServicesCancelledRef.current = false;
      setShowCancelDialog(false);
      setSecurityAnswer('');
      
      addTimelineEvent({
        type: 'alert',
        title: '❌ Alert Cancelled',
        description: 'Emergency alert has been cancelled by the sender. All responders have been notified.',
        timestamp: new Date()
      });

      toast({
        title: "Alert Cancelled",
        description: "Your emergency alert has been successfully cancelled.",
        className: "border-gray-500"
      });
    } else {
      toast({
        title: "Incorrect Answer",
        description: "The security answer is incorrect. Alert remains active.",
        variant: "destructive"
      });
      setSecurityAnswer('');
    }
  };

  const handleCloseCancelDialog = () => {
    setShowCancelDialog(false);
    setSecurityAnswer('');
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <div className="fixed inset-0 modern-gradient z-50 overflow-auto flex flex-col w-full">
      {/* Persistent Demo Banner */}
      {showDemoBanner && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between z-[60] shadow-xl">
          <div className="flex items-center space-x-3">
            <p className="font-medium">🎮 Demo Mode Active - Experience the Guardian emergency response system</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-white hover:bg-gray-800 hover:text-white h-8 px-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Header */}
      <header className={`glass-effect bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 py-3 flex-shrink-0 w-full sticky top-0 z-40 ${showDemoBanner ? 'mt-12' : ''}`}>
        <div className="flex items-center justify-between w-full max-w-none mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 emergency-gradient rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Guardian</h1>
              <p className="text-sm text-gray-600">Emergency Response Network - Demo Mode</p>
            </div>
          </div>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-white/50">
                <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-700" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{mockWallet.username}</p>
                  <p className="text-xs text-gray-500">{mockWallet.address.slice(0, 6)}...{mockWallet.address.slice(-4)}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-effect bg-white/95 backdrop-blur-md border-0 shadow-xl">
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
          <div className="glass-effect rounded-xl p-6 text-center flex-shrink-0 shadow-lg">
            <p className="text-gray-800 font-medium">🎮 Demo Mode Active - Experience the Guardian emergency response system</p>
          </div>
        )}

        {/* Nearby Responders Card */}
        <div className="grid grid-cols-1 gap-4 flex-shrink-0">
          <Card className="glass-effect border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-gray-700" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Nearby Responders</p>
                  <p className="text-2xl font-bold text-gray-900">{nearbyResponders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Button Section with Map as Background */}
        <Card className="glass-effect border-0 shadow-xl relative overflow-hidden flex-1 flex flex-col">
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
          <div className="relative z-10 glass-effect bg-white/95 backdrop-blur-md flex-1 flex flex-col">
            <CardHeader className="text-center flex-shrink-0">
              <CardTitle className="text-2xl text-gray-900">Emergency Response Center</CardTitle>
              <p className="text-gray-600">
                {!alertSent ? "Press the button below if you need immediate assistance" : "Local first responders will be contacted automatically"}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 flex-1 justify-center">
              {/* Emergency Services Dialog - Integrated into card */}
              {showEmergencyDialog && (
                <div className="w-full max-w-md animate-fade-in">
                  <Card className="glass-effect border-0 shadow-xl bg-red-50/90">
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Phone className="w-8 h-8 text-red-600" />
                        <AlertCircle className="w-8 h-8 text-red-600 animate-pulse" />
                      </div>
                      <CardTitle className="text-red-800">Contact Local First Responders?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-red-700">
                        Local first responders will be contacted automatically in:
                      </p>
                      <div className="text-4xl font-bold emergency-text-gradient">
                        {countdown}
                      </div>
                      <Button 
                        onClick={handleCancelEmergencyServices}
                        variant="outline"
                        className="glass-effect border-0 text-red-700 hover:bg-red-100/80 shadow-lg"
                      >
                        Cancel - Don't Contact Local First Responders
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
                      <Card className="border border-blue-200 bg-blue-50 shadow-lg">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Play className="w-6 h-6 text-blue-600" />
                              <div>
                                <p className="font-semibold text-blue-800">Demo Alert Active</p>
                                <p className="text-sm text-blue-700">
                                  Demo started at {activeAlert.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={handleCancelAlert}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <StopCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Event Timeline */}
                      {timelineEvents.length > 0 && (
                        <Card className="glass-effect border-0 shadow-lg bg-white/95">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <Clock className="w-5 h-5" />
                              <span>Event Timeline</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                            {timelineEvents.map((event, index) => (
                              <div key={event.id} className="animate-fade-in">
                                <div className="flex items-start space-x-3 p-3 rounded-xl glass-effect bg-white/60 shadow-sm">
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

      {/* Security Question Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-800">Cancel Emergency Alert</DialogTitle>
            <DialogDescription>
              We would love to know you're safe, to cancel the alert, please answer your security question.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Security Question:</p>
              <p className="text-gray-900">{securityQuestion}</p>
              <p className="text-xs text-gray-500 mt-1 italic">Demo hint: Try typing 'Beth'</p>
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmCancelAlert()}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCloseCancelDialog}
            >
              Keep Alert Active
            </Button>
            <Button
              onClick={handleConfirmCancelAlert}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Cancel Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DemoMode;
