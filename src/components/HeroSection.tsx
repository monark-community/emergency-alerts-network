
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
    <div className="relative overflow-hidden modern-gradient border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Hero Content */}
        <div className="text-center space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="mx-auto glass-effect border-0 text-gray-700 shadow-lg">
            🚨 Decentralized Emergency Response Network
          </Badge>
          
          {/* Hero Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Help is just 
              <span className="emergency-gradient bg-clip-text text-transparent"> seconds away</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with nearby responders instantly. Earn rewards for helping others. 
              Build safer communities through decentralized emergency response.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onTryDemo}
              size="lg" 
              className="emergency-gradient text-white font-semibold px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
            <Button 
              onClick={onConnectWallet}
              variant="outline" 
              size="lg" 
              className="glass-effect border-0 text-gray-700 font-semibold px-10 py-4 text-lg hover:bg-white/90 shadow-lg"
            >
              Connect Wallet & Join
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold emergency-gradient bg-clip-text text-transparent">2.3s</div>
              <div className="text-sm text-gray-600 mt-2">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600">94%</div>
              <div className="text-sm text-gray-600 mt-2">Help Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600 mt-2">Active Responders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">$12K</div>
              <div className="text-sm text-gray-600 mt-2">Rewards Distributed</div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 emergency-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Instant Safety Network</h3>
              <p className="text-gray-600">Alert nearby verified responders with one tap. Help is always within reach.</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Earn by Helping</h3>
              <p className="text-gray-600">Get rewarded for responding to alerts and building community trust.</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Build Reputation</h3>
              <p className="text-gray-600">Increase your trust score and unlock premium response opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
