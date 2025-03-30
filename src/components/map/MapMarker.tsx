
import React from 'react';
import { MapPin } from 'lucide-react';

interface MapMarkerProps {
  selectedPoint: { x: number; y: number } | null;
  interactive?: boolean;
}

const MapMarker = ({ selectedPoint, interactive }: MapMarkerProps) => {
  if (!interactive || !selectedPoint) return null;

  return (
    <div 
      className="absolute pointer-events-none" 
      style={{ 
        left: `${selectedPoint.x}px`, 
        top: `${selectedPoint.y}px`, 
        transform: 'translate(-50%, -50%)' 
      }}
    >
      <div className="relative">
        <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
        <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-red-500 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default MapMarker;
