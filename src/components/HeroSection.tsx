
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Clock, Award, ArrowRight, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onConnectWallet: () => void;
  onTryDemo: () => void;
}

const HeroSection = ({ onConnectWallet, onTryDemo }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emergency-50 via-white to-safe-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Hero Content */}
        <div className="text-center space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="mx-auto bg-white border-emergency-200 text-emergency-700">
            🚨 Decentralized Emergency Response Network
          </Badge>
          
          {/* Hero Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Help is just 
              <span className="text-emergency-600"> seconds away</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with nearby responders instantly. Earn rewards for helping others. 
              Build safer communities through decentralized emergency response.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onConnectWallet}
              size="lg" 
              className="emergency-gradient text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Connect Wallet & Join Network
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={onTryDemo}
              variant="outline" 
              size="lg" 
              className="border-gray-300 text-gray-700 font-semibold px-8 py-3 text-lg hover:bg-gray-50"
            >
              <Play className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-emergency-600">2.3s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-safe-600">94%</div>
              <div className="text-sm text-gray-600">Help Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Active Responders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-600">$12K</div>
              <div className="text-sm text-gray-600">Rewards Distributed</div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="border-safe-200 bg-safe-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 safe-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Safety Network</h3>
              <p className="text-sm text-gray-600">Alert nearby verified responders with one tap. Help is always within reach.</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn by Helping</h3>
              <p className="text-sm text-gray-600">Get rewarded for responding to alerts and building community trust.</p>
            </CardContent>
          </Card>

          <Card className="border-warning-200 bg-warning-50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Build Reputation</h3>
              <p className="text-sm text-gray-600">Increase your trust score and unlock premium response opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
