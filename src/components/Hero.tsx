
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-metal-900"
      dir="rtl"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-metal-900/90 to-metal-800/80">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-[pulse_15s_ease-in-out_infinite]"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-metal-900/90 to-metal-800/70"></div>
        
        {/* Add floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-accent/20 animate-float"
              style={{
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className={cn(
            'transition-all duration-700 delay-300',
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
          )}>
            <span className="inline-block px-3 py-1 mb-5 text-xs font-medium tracking-wider text-white uppercase bg-accent rounded-full animate-pulse">
              بهترین خدمات پولیش کاری در ایران
            </span>
          </div>
          
          <h1 className={cn(
            'text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6',
            'transition-all duration-700 delay-500',
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
          )}>
            پرداخت کاری و پولیش<br />
            <span className="text-accent relative inline-block animate-[pulse_3s_ease-in-out_infinite]">
              حرفه‌ای فلزات
              <span className="absolute -right-6 -top-6">
                <Sparkles className="h-5 w-5 text-accent-light animate-ping" />
              </span>
            </span>
          </h1>
          
          <p className={cn(
            'text-xl text-metal-200 mb-10 max-w-2xl mx-auto',
            'transition-all duration-700 delay-700',
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
          )}>
            با بیش از ده سال تجربه در صنعت پرداخت کاری، بهترین کیفیت و زیبایی را برای فلزات شما به ارمغان می‌آوریم.
          </p>
          
          <div className={cn(
            'flex flex-col sm:flex-row justify-center items-center gap-4',
            'transition-all duration-700 delay-900',
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
          )}>
            <a href="#portfolio" className="btn-primary w-full sm:w-auto hover:scale-105 transition-transform duration-300 shadow-lg shadow-accent/20">
              <span>مشاهده نمونه کارها</span>
              <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
            </a>
            <a href="#contact" className="px-6 py-3 w-full sm:w-auto rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300 hover:border-accent hover:text-accent hover:scale-105">
              تماس با ما
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className={cn(
          'text-white/80 text-sm mb-2',
          'transition-all duration-700 delay-1100',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}>
          برای دیدن بیشتر اسکرول کنید
        </span>
        <div className={cn(
          'w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1',
          'transition-all duration-700 delay-1200 animate-pulse',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
