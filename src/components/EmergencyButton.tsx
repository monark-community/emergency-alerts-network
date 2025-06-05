
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface EmergencyButtonProps {
  onTrigger: () => void;
  isActive: boolean;
  disabled?: boolean;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ 
  onTrigger, 
  isActive, 
  disabled = false 
}) => {
  return (
    <div className="relative">
      <Button
        onClick={onTrigger}
        disabled={disabled}
        className={`
          emergency-button emergency-gradient text-white font-bold text-lg
          ${isActive ? 'animate-pulse-emergency' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
        `}
      >
        <div className="flex flex-col items-center space-y-2">
          <AlertTriangle className="w-12 h-12" />
          <span>{isActive ? 'ALERT SENT' : 'EMERGENCY'}</span>
        </div>
      </Button>
      
      {isActive && (
        <div className="absolute -inset-4 rounded-full border-4 border-emergency-400 animate-ping opacity-75"></div>
      )}
    </div>
  );
};

export default EmergencyButton;
