
import React from 'react';
import { MapPin, Navigation, Crosshair } from 'lucide-react';

interface MapOverlaysProps {
  locationName: string;
  interactive?: boolean;
}

const MapOverlays = ({ locationName, interactive }: MapOverlaysProps) => {
  return (
    <>
      {/* Location indicator overlay */}
      <div className="absolute top-1 right-1 bg-white rounded-md px-2 py-1 shadow-sm flex items-center text-xs">
        <MapPin className="h-3 w-3 text-accent mr-1" />
        <span>{locationName}</span>
      </div>
      
      {/* Navigation or interactive hint overlay */}
      <div className="absolute bottom-2 left-2 bg-accent text-white rounded-md px-3 py-1.5 shadow-md flex items-center text-xs opacity-90 hover:opacity-100 transition-opacity">
        {interactive ? (
          <>
            <MapPin className="h-3 w-3 mr-1" />
            <span>برای انتخاب مکان روی نقشه کلیک کنید</span>
          </>
        ) : (
          <>
            <Navigation className="h-3 w-3 mr-1" />
            <span>برای مسیریابی کلیک کنید</span>
          </>
        )}
      </div>

      {/* Visual indicator for click functionality */}
      {interactive && (
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm flex items-center text-xs">
          <Crosshair className="h-3 w-3 text-red-500 mr-1" />
          <span>نقطه انتخابی روی نقشه</span>
        </div>
      )}
    </>
  );
};

export default MapOverlays;
