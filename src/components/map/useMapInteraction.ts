
import { useState, useEffect, useRef } from 'react';

interface MapLocation {
  latitude: number;
  longitude: number;
  name: string;
}

interface UseMapInteractionProps {
  location: MapLocation;
  interactive?: boolean;
  onLocationChange?: (lat: number, lng: number) => void;
}

interface UseMapInteractionReturn {
  isVisible: boolean;
  showNavigationOptions: boolean;
  selectedPoint: { x: number; y: number } | null;
  mapRef: React.RefObject<HTMLDivElement>;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  handleMapClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowNavigationOptions: (show: boolean) => void;
}

const useMapInteraction = ({ 
  location, 
  interactive, 
  onLocationChange 
}: UseMapInteractionProps): UseMapInteractionReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [showNavigationOptions, setShowNavigationOptions] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{x: number, y: number} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
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

  // Initialize marker at the center of the map
  useEffect(() => {
    if (iframeRef.current && interactive) {
      const rect = iframeRef.current.getBoundingClientRect();
      setSelectedPoint({
        x: rect.width / 2,
        y: rect.height / 2
      });
    }
  }, [interactive]);

  // Update marker when location changes
  useEffect(() => {
    if (iframeRef.current && interactive && selectedPoint === null) {
      const rect = iframeRef.current.getBoundingClientRect();
      setSelectedPoint({
        x: rect.width / 2,
        y: rect.height / 2
      });
    }
  }, [location, interactive, selectedPoint]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && onLocationChange && iframeRef.current) {
      // We can't directly get coordinates from the iframe click due to cross-origin restrictions
      // Instead, we'll use an approximation based on the click position relative to the iframe
      
      const rect = iframeRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the iframe
      const y = e.clientY - rect.top;  // y position within the iframe
      
      // Save the clicked position for displaying the marker
      setSelectedPoint({ x, y });
      
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

  return {
    isVisible,
    showNavigationOptions,
    selectedPoint,
    mapRef,
    iframeRef,
    handleMapClick,
    setShowNavigationOptions
  };
};

export default useMapInteraction;
