
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';

interface MapProps {
  location?: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

const Map = ({ location = { latitude: 35.699450, longitude: 51.335952, name: 'میدان آزادی' } }: MapProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

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

  const handleMapClick = () => {
    // Create Google Maps URL for directions
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    
    // Open the URL in a new tab/window
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div
      ref={mapRef}
      className={cn(
        'w-1/2 h-48 sm:h-64 rounded-lg overflow-hidden transition-all duration-700 mt-3 relative mx-auto cursor-pointer',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      onClick={handleMapClick}
      title="برای باز کردن مسیریاب کلیک کنید"
    >
      <iframe
        title="موقعیت ما روی نقشه"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.0225694256114!2d51.33595291525961!3d35.699450280190495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfe05732c2e91%3A0xfcbec017befd15f4!2sAzadi%20Tower!5e0!3m2!1sen!2s!4v1696423086805!5m2!1sen!2s"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      {/* Marker indicator overlay */}
      <div className="absolute top-1 right-1 bg-white rounded-md px-2 py-1 shadow-sm flex items-center text-xs">
        <MapPin className="h-3 w-3 text-accent mr-1" />
        <span>{location.name}</span>
      </div>
      
      {/* Navigation hint overlay */}
      <div className="absolute bottom-2 left-2 bg-accent text-white rounded-md px-3 py-1.5 shadow-md flex items-center text-xs opacity-90 hover:opacity-100 transition-opacity">
        <Navigation className="h-3 w-3 mr-1" />
        <span>برای مسیریابی کلیک کنید</span>
      </div>
    </div>
  );
};

export default Map;
