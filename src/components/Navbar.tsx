
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'خانه', href: '#home' },
    { title: 'نمونه کارها', href: '#portfolio' },
    { title: 'خدمات', href: '#services' },
    { title: 'درباره ما', href: '#about' },
    { title: 'تماس', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="#" 
          className={cn(
            'font-display text-2xl font-bold transition-colors duration-300',
            scrolled ? 'text-metal-900' : 'text-white'
          )}
        >
          پولیش‌کاری حرفه‌ای
        </a>
        
        <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-accent mx-1',
                scrolled ? 'text-metal-700' : 'text-white'
              )}
            >
              {link.title}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-4 py-2 bg-accent text-white rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent-dark"
          >
            تماس با ما
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'md:hidden p-2 rounded-md transition-colors',
            scrolled ? 'text-metal-900' : 'text-white'
          )}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-metal-900/95 z-50 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-accent text-xl font-medium transition-colors"
              >
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 bg-accent text-white rounded-md text-lg font-medium transition-all duration-300 hover:bg-accent-dark mt-4"
            >
              تماس با ما
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
