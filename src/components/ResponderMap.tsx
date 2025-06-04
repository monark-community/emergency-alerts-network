
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Navigation } from 'lucide-react';

interface Responder {
  id: number;
  location: { lat: number; lng: number };
  reputation: number;
  responding: boolean;
}

interface ResponderMapProps {
  userLocation: { lat: number; lng: number } | null;
  responders: Responder[];
  activeAlert: any;
  onRespondToAlert: (alertId: number) => void;
}

const ResponderMap: React.FC<ResponderMapProps> = ({
  userLocation,
  responders,
  activeAlert,
  onRespondToAlert
}) => {
  if (!userLocation) {
    return (
      <div className="map-container bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-2" />
          <p>Location access needed to show map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Map placeholder with responder visualization */}
      <div className="map-container bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden border-2 border-gray-200">
        {/* User location */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className={`w-6 h-6 rounded-full ${activeAlert ? 'bg-emergency-500 animate-pulse-emergency' : 'bg-blue-500'} border-4 border-white shadow-lg`}>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <Badge variant="secondary" className="text-xs">
                You {activeAlert ? '(Emergency)' : ''}
              </Badge>
            </div>
          </div>
        </div>

        {/* Responders */}
        {responders.map((responder, index) => (
          <div
            key={responder.id}
            className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-md ${
              responder.responding ? 'bg-safe-500 animate-bounce' : 'bg-gray-400'
            }`}
            style={{
              top: `${30 + index * 15}%`,
              left: `${20 + index * 20}%`
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <Badge 
                variant="secondary" 
                className={`text-xs ${responder.responding ? 'bg-safe-100 text-safe-800' : ''}`}
              >
                {responder.reputation}★
              </Badge>
            </div>
          </div>
        ))}

        {/* Distance circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 border-2 border-blue-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-200 rounded-full opacity-20"></div>
        </div>

        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-white/80">
            📍 Showing 0.5km radius
          </Badge>
        </div>
      </div>

      {/* Responder list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {responders.map((responder) => (
          <Card key={responder.id} className={`border ${responder.responding ? 'border-safe-300 bg-safe-50' : 'border-gray-200'}`}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${responder.responding ? 'bg-safe-500' : 'bg-gray-400'}`}></div>
                  <div>
                    <p className="font-medium text-sm">Responder #{responder.id}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{responder.reputation} reputation</span>
                    </div>
                  </div>
                </div>
                
                {!responder.responding && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onRespondToAlert(responder.id)}
                    className="text-xs"
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Respond
                  </Button>
                )}
                
                {responder.responding && (
                  <Badge className="bg-safe-500 text-white">
                    Responding
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResponderMap;
