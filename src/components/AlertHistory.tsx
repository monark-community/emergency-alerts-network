
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';

const AlertHistory: React.FC = () => {
  const mockAlerts = [
    {
      id: 1,
      type: 'emergency',
      timestamp: new Date(Date.now() - 3600000),
      status: 'resolved',
      responders: 3,
      location: 'Campus Library'
    },
    {
      id: 2,
      type: 'assistance',
      timestamp: new Date(Date.now() - 7200000),
      status: 'resolved',
      responders: 1,
      location: 'Main Street'
    },
    {
      id: 3,
      type: 'emergency',
      timestamp: new Date(Date.now() - 86400000),
      status: 'resolved',
      responders: 5,
      location: 'Student Center'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-safe-100 text-safe-800 border-safe-300';
      case 'active': return 'bg-emergency-100 text-emergency-800 border-emergency-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'emergency' ? AlertCircle : Users;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Alert Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockAlerts.map((alert) => {
            const TypeIcon = getTypeIcon(alert.type);
            return (
              <div 
                key={alert.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <TypeIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-sm capitalize">{alert.type} Alert</p>
                    <p className="text-xs text-gray-600">{alert.location}</p>
                    <p className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{alert.responders} responders</p>
                  </div>
                  <Badge className={getStatusColor(alert.status)}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Resolved
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertHistory;
