
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
        transform: 'translate(-50%, -100%)' 
      }}
    >
      <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
    </div>
  );
};

export default MapMarker;
