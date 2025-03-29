
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin } from 'lucide-react';
import Map from './Map';

const Contact = () => {
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

  // Location data for the map
  const locationData = {
    latitude: 35.699450,
    longitude: 51.335952,
    name: 'میدان آزادی'
  };

  return (
    <section id="contact" className="py-24 bg-metal-50" dir="rtl" ref={sectionRef}>
      <div className="section-container">
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="text-sm uppercase tracking-wider text-accent font-medium">ارتباط با ما</span>
          <h2 className="section-title text-center mx-auto">تماس با ما</h2>
          <p className="text-metal-600 mt-4">
            برای درخواست خدمات، دریافت مشاوره یا استعلام قیمت، از طریق راه‌های ارتباطی زیر با ما در تماس باشید
          </p>
        </div>

        <div className={cn(
          'transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <div className="bg-white rounded-xl shadow-sm p-8 h-full">
            <h3 className="text-2xl font-display font-semibold mb-6">اطلاعات تماس</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">شماره تماس</h4>
                  <p className="text-metal-600">021-12345678</p>
                  <p className="text-metal-600">0912-3456789</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">ایمیل</h4>
                  <p className="text-metal-600">info@metalpolishing.example</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">آدرس</h4>
                  <p className="text-metal-600">تهران، خیابان مثال، کوچه نمونه، پلاک 123</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-semibold mb-4">ساعات کاری</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-metal-600">شنبه تا چهارشنبه</span>
                  <span>8:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-metal-600">پنج‌شنبه</span>
                  <span>8:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-metal-600">جمعه</span>
                  <span>تعطیل</span>
                </div>
              </div>
            </div>
            
            {/* Map component with location data */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">موقعیت ما روی نقشه</h4>
              <Map location={locationData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
