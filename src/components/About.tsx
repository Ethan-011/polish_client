
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const features = [
    "بیش از ده سال تجربه در صنعت پرداخت‌کاری",
    "استفاده از مواد و تجهیزات با کیفیت",
    "تیم متخصص و حرفه‌ای",
    "ضمانت کیفیت خدمات",
    "قیمت‌گذاری منصفانه و شفاف",
    "تحویل به موقع پروژه‌ها"
  ];

  return (
    <section id="about" className="py-24 bg-metal-900 text-white" dir="rtl" ref={sectionRef}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <div className={cn(
            'relative transition-all duration-700',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          )}>
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1605433663111-2a9b424e9656?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional metal polishing workshop" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-metal-900/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-10 -right-5 bg-accent text-white p-5 rounded-xl shadow-lg">
              <div className="text-4xl font-bold">+10</div>
              <div className="text-sm font-medium">سال تجربه</div>
            </div>
          </div>
          
          {/* Right column - Text */}
          <div className={cn(
            'transition-all duration-700 delay-300',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          )}>
            <span className="text-sm uppercase tracking-wider text-accent font-medium">درباره ما</span>
            <h2 className="section-title mb-6 text-white">
              متخصص در پرداخت‌کاری و پولیش فلزات
            </h2>
            <p className="text-metal-300 mb-8 text-lg">
              با بیش از یک دهه تجربه در صنعت پرداخت‌کاری، ما به ارائه خدمات با کیفیت و حرفه‌ای در زمینه پولیش و پرداخت انواع فلزات متعهد هستیم. تخصص ما ترکیبی از دانش فنی، مهارت حرفه‌ای و استفاده از بهترین تجهیزات و مواد است.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mt-0.5 ml-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                تماس با ما
              </a>
              <a href="#portfolio" className="px-6 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300 text-center">
                مشاهده نمونه کارها
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
