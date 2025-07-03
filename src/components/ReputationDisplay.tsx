
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';

interface ReputationDisplayProps {
  reputation: number;
}

const ReputationDisplay: React.FC<ReputationDisplayProps> = ({ reputation }) => {
  const getReputationLevel = (score: number) => {
    if (score >= 90) return { level: 'Guardian Elite', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 75) return { level: 'Trusted Responder', color: 'text-yellow-700', bg: 'bg-yellow-100' };
    if (score >= 50) return { level: 'Community Helper', color: 'text-green-600', bg: 'bg-green-100' };
    return { level: 'New Guardian', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const reputationInfo = getReputationLevel(reputation);

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <Star className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-gray-700">Reputation Score</p>
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold text-gray-900">{reputation}</p>
              <Badge className={`glass-effect border-0 shadow-sm ${reputationInfo.color}`}>
                {reputationInfo.level}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200/50 rounded-full h-2">
          <div 
            className="emergency-gradient h-2 rounded-full transition-all duration-300"
            style={{ width: `${reputation}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReputationDisplay;
