
import React, { useState } from 'react';
import { MessageCircle, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const ChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Phone number for call and WhatsApp contact
  const phoneNumber = '09123456789';
  
  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <div className={cn(
              "absolute bottom-0 left-0 transform translate-y-[-110%] translate-x-[-10%] bg-white text-metal-800 rounded-lg py-2 px-4 shadow-lg transition-all duration-300",
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
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-2 w-auto" align="end">
          <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer hover:bg-accent/10 rounded-md" asChild>
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 w-full">
              <div className="bg-accent/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <span className="text-metal-800 font-medium">تماس مستقیم</span>
            </a>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer hover:bg-accent/10 rounded-md" asChild>
            <a 
              href={`https://wa.me/${phoneNumber}?text=سلام، نیاز به پشتیبانی دارم.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full"
            >
              <div className="bg-accent/10 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-accent" />
              </div>
              <span className="text-metal-800 font-medium">ارسال پیام واتساپ</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatButton;
