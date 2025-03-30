
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Navigation, Map as MapIcon, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isVisible, setIsVisible] = useState(false);
  const [showNavigationOptions, setShowNavigationOptions] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Close navigation options when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowNavigationOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate the Google Maps embed URL with the current coordinates
  const getMapUrl = () => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0225694256114!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzU4LjAiTiA1McKwMjAnMDkuNCJF!5e0!3m2!1sen!2s!4v1696423086805!5m2!1sen!2s`;
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && onLocationChange && iframeRef.current) {
      // We can't directly get coordinates from the iframe click due to cross-origin restrictions
      // Instead, we'll use an approximation based on the click position relative to the iframe
      
      const rect = iframeRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the iframe
      const y = e.clientY - rect.top;  // y position within the iframe
      
      // Calculate percentage position within the iframe
      const percentX = x / rect.width;
      const percentY = y / rect.height;
      
      // Approximate new coordinates based on current view
      // This is a simplified approach - for more accuracy, we would need a proper map API
      const latRange = 0.01; // Approximate latitude range in the current view
      const lngRange = 0.01; // Approximate longitude range in the current view
      
      const newLat = location.latitude + (0.5 - percentY) * latRange;
      const newLng = location.longitude + (percentX - 0.5) * lngRange;
      
      onLocationChange(newLat, newLng);
    } else if (!interactive) {
      setShowNavigationOptions(true);
    }
  };

  const openGoogleMaps = () => {
    // Create Google Maps URL for directions
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    // Open the URL in a new tab/window
    window.open(googleMapsUrl, '_blank');
    setShowNavigationOptions(false);
  };

  const openBalad = () => {
    // Create Balad URL for directions
    const baladUrl = `https://balad.ir/directions?destination=${location.latitude},${location.longitude}`;
    // Open the URL in a new tab/window
    window.open(baladUrl, '_blank');
    setShowNavigationOptions(false);
  };

  const openNeshan = () => {
    // Create Neshan URL for directions
    const neshanUrl = `https://neshan.org/maps/@${location.latitude},${location.longitude},15z`;
    // Open the URL in a new tab/window
    window.open(neshanUrl, '_blank');
    setShowNavigationOptions(false);
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
      
      {/* Marker indicator overlay */}
      <div className="absolute top-1 right-1 bg-white rounded-md px-2 py-1 shadow-sm flex items-center text-xs">
        <MapPin className="h-3 w-3 text-accent mr-1" />
        <span>{location.name}</span>
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

      {/* Display a centered pin for interactive mode */}
      {interactive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <MapPin className="h-8 w-8 text-accent animate-pulse" />
        </div>
      )}

      {/* Navigation options popup */}
      {showNavigationOptions && !interactive && (
        <div 
          ref={optionsRef}
          className="absolute inset-0 flex items-center justify-center bg-black/70 z-10"
        >
          <div className="bg-white rounded-lg p-4 w-4/5 flex flex-col gap-3">
            <h3 className="text-center font-semibold mb-2">انتخاب مسیریاب</h3>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center w-full" 
              onClick={openGoogleMaps}
            >
              <span>گوگل مپس</span>
              <MapIcon className="h-4 w-4 text-accent" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center w-full" 
              onClick={openBalad}
            >
              <span>بلد</span>
              <MapIcon className="h-4 w-4 text-accent" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center w-full" 
              onClick={openNeshan}
            >
              <span>نشان</span>
              <MapIcon className="h-4 w-4 text-accent" />
            </Button>
            
            <Button 
              variant="ghost" 
              className="mt-2" 
              onClick={() => setShowNavigationOptions(false)}
            >
              انصراف
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
