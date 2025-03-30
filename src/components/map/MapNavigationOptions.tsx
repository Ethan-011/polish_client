
import React, { useRef, useEffect } from 'react';
import { MapIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MapNavigationOptionsProps {
  show: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  onClose: () => void;
}

const MapNavigationOptions = ({ show, location, onClose }: MapNavigationOptionsProps) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!show) return null;

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    window.open(googleMapsUrl, '_blank');
    onClose();
  };

  const openBalad = () => {
    const baladUrl = `https://balad.ir/directions?destination=${location.latitude},${location.longitude}`;
    window.open(baladUrl, '_blank');
    onClose();
  };

  const openNeshan = () => {
    const neshanUrl = `https://neshan.org/maps/@${location.latitude},${location.longitude},15z`;
    window.open(neshanUrl, '_blank');
    onClose();
  };

  return (
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
          onClick={onClose}
        >
          انصراف
        </Button>
      </div>
    </div>
  );
};

export default MapNavigationOptions;
