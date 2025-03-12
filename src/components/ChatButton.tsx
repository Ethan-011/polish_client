
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="fixed bottom-6 left-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/chat">
        <div className="relative">
          <div className={cn(
            "absolute bottom-0 right-0 transform translate-y-[-110%] translate-x-[10%] bg-white text-metal-800 rounded-lg py-2 px-4 shadow-lg transition-all duration-300",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}>
            <p className="whitespace-nowrap text-sm font-medium">پشتیبانی آنلاین</p>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            <button className="bg-accent hover:bg-accent-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center">
              <MessageCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChatButton;
