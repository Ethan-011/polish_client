
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Shield, Wrench, Sparkles, Zap, Clock, RefreshCw } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    title: "پولیش حرفه‌ای",
    description: "پرداخت و پولیش انواع فلزات با بالاترین کیفیت و دقت برای ایجاد سطحی براق و یکدست"
  },
  {
    icon: <Wrench className="h-8 w-8 text-accent" />,
    title: "پرداخت صنعتی",
    description: "پرداخت دقیق و حرفه‌ای قطعات صنعتی با استفاده از تجهیزات پیشرفته برای کاربردهای تخصصی"
  },
  {
    icon: <Shield className="h-8 w-8 text-accent" />,
    title: "محافظت سطح",
    description: "اعمال پوشش‌های محافظتی روی سطوح فلزی برای جلوگیری از زنگ‌زدگی و افزایش دوام"
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-accent" />,
    title: "احیای فلزات",
    description: "احیا و بازسازی سطوح فلزی قدیمی و آسیب‌دیده برای بازگرداندن زیبایی و درخشندگی اولیه"
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "پرداخت سریع",
    description: "خدمات پرداخت‌کاری سریع برای پروژه‌های فوری با حفظ کیفیت بالا"
  },
  {
    icon: <Clock className="h-8 w-8 text-accent" />,
    title: "مشاوره تخصصی",
    description: "ارائه مشاوره تخصصی برای انتخاب بهترین روش پرداخت و نگهداری از سطوح فلزی"
  }
];

const Services = () => {
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

  // If there are no services, don't render the section
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-white" dir="rtl" ref={sectionRef}>
      <div className="section-container">
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="text-sm uppercase tracking-wider text-accent font-medium">خدمات ما</span>
          <h2 className="section-title text-center mx-auto">خدمات پولیش و پرداخت</h2>
          <p className="text-metal-600 mt-4">
            ما طیف گسترده‌ای از خدمات پرداخت‌کاری و پولیش فلزات را با بالاترین استانداردهای کیفی ارائه می‌دهیم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={cn(
                'bg-metal-50 rounded-xl p-8 transition-all duration-700 hover:shadow-lg hover:-translate-y-1',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                { 'delay-100': index % 3 === 0, 'delay-200': index % 3 === 1, 'delay-300': index % 3 === 2 }
              )}
            >
              <div className="mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-metal-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
