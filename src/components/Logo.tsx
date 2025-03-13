
import React from 'react';
import { Sparkles, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ variant = 'dark', size = 'md', className }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-metal-900';
  const fontSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];
  
  return (
    <Link 
      to="/" 
      className={cn(
        'font-display font-bold transition-colors duration-300 flex items-center gap-2 group',
        textColor,
        fontSize,
        className
      )}
    >
      <div className="relative">
        <Gem className={cn(
          "h-6 w-6 md:h-7 md:w-7 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12",
          size === 'lg' && 'h-8 w-8',
          size === 'sm' && 'h-5 w-5'
        )} />
        <Sparkles className={cn(
          "h-3.5 w-3.5 md:h-4 md:w-4 absolute -top-1 -right-1 text-accent-light animate-pulse",
          size === 'lg' && 'h-5 w-5',
          size === 'sm' && 'h-3 w-3'
        )} />
      </div>
      <span className={cn(
        "bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent relative",
        "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent-light after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left"
      )}>
        <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-2px]">پولیش‌کاری حرفه‌ای</span>
      </span>
    </Link>
  );
};

export default Logo;
