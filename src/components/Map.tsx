
import React from 'react';
import { cn } from '@/lib/utils';
import MapMarker from './map/MapMarker';
import MapNavigationOptions from './map/MapNavigationOptions';
import MapOverlays from './map/MapOverlays';
import useMapInteraction from './map/useMapInteraction';

interface MapProps {
  location?: {
    latitude: number;
    longitude: number;
    name: string;
  };
  interactive?: boolean;
  onLocationChange?: (lat: number, lng: number) => void;
}

const Map = ({ 
  location = { latitude: 35.699450, longitude: 51.335952, name: 'میدان آزادی' },
  interactive = false,
  onLocationChange
}: MapProps) => {
  const {
    isVisible,
    showNavigationOptions,
    selectedPoint,
    mapRef,
    iframeRef,
    handleMapClick,
    setShowNavigationOptions
  } = useMapInteraction({ location, interactive, onLocationChange });

  // Generate the Google Maps embed URL with the current coordinates
  const getMapUrl = () => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0225694256114!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzU4LjAiTiA1McKwMjAnMDkuNCJF!5e0!3m2!1sen!2s!4v1696423086805!5m2!1sen!2s`;
  };

  return (
    <div
      ref={mapRef}
      className={cn(
        'w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden transition-all duration-700 mt-3 relative mx-auto',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        interactive ? 'cursor-crosshair' : 'cursor-pointer'
      )}
      onClick={handleMapClick}
      title={interactive ? "برای انتخاب مکان کلیک کنید" : "برای باز کردن مسیریاب کلیک کنید"}
    >
      <iframe
        ref={iframeRef}
        title="موقعیت ما روی نقشه"
        src={getMapUrl()}
        className="w-full h-full border-0 pointer-events-none"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      {/* Map overlays (info, hints) */}
      <MapOverlays locationName={location.name} interactive={interactive} />
      
      {/* Selected location marker */}
      <MapMarker selectedPoint={selectedPoint} interactive={interactive} />

      {/* Navigation options popup */}
      <MapNavigationOptions 
        show={showNavigationOptions && !interactive}
        location={location}
        onClose={() => setShowNavigationOptions(false)}
      />
    </div>
  );
};

export default Map;
