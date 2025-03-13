
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
        'font-display font-bold transition-colors duration-300 flex items-center gap-2',
        textColor,
        fontSize,
        className
      )}
    >
      <div className="relative">
        <Gem className={cn(
          "h-6 w-6 md:h-7 md:w-7 text-accent",
          size === 'lg' && 'h-8 w-8',
          size === 'sm' && 'h-5 w-5'
        )} />
        <Sparkles className={cn(
          "h-3.5 w-3.5 md:h-4 md:w-4 absolute -top-1 -right-1 text-accent-light",
          size === 'lg' && 'h-5 w-5',
          size === 'sm' && 'h-3 w-3'
        )} />
      </div>
      <span className={cn(
        "bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent",
      )}>
        پولیش‌کاری حرفه‌ای
      </span>
    </Link>
  );
};

export default Logo;
