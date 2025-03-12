
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "پولیش استیل ضد زنگ",
    category: "استیل",
    image: "https://images.unsplash.com/photo-1551884831-bbf3cdc4eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "پرداخت و براق‌سازی قطعات استیل با بالاترین کیفیت"
  },
  {
    id: 2,
    title: "پولیش آلومینیوم",
    category: "آلومینیوم",
    image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "براق‌سازی و احیای سطوح آلومینیومی"
  },
  {
    id: 3,
    title: "پرداخت برنج و مس",
    category: "برنج و مس",
    image: "https://images.unsplash.com/photo-1563456020159-bc38d9279b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "پولیش تخصصی قطعات برنجی و مسی برای درخشندگی بی‌نظیر"
  },
  {
    id: 4,
    title: "پرداخت قطعات صنعتی",
    category: "صنعتی",
    image: "https://images.unsplash.com/photo-1533667586627-9f5ddbd42539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "پولیش دقیق قطعات صنعتی با اهمیت بالا"
  },
  {
    id: 5,
    title: "پولیش قطعات تزئینی",
    category: "تزئینی",
    image: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "پرداخت ظریف و حرفه‌ای قطعات تزئینی و دکوراتیو"
  },
  {
    id: 6,
    title: "احیای سطوح فرسوده",
    category: "احیا",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "بازسازی و احیای سطوح فلزی قدیمی و آسیب‌دیده"
  },
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('همه');
  const [visibleItems, setVisibleItems] = useState<PortfolioItem[]>(portfolioItems);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['همه', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

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

  useEffect(() => {
    if (activeFilter === 'همه') {
      setVisibleItems(portfolioItems);
    } else {
      setVisibleItems(portfolioItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-24 bg-metal-50" dir="rtl" ref={sectionRef}>
      <div className="section-container">
        <div className={cn(
          'text-center max-w-3xl mx-auto mb-16 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          <span className="text-sm uppercase tracking-wider text-accent font-medium">نمونه کارها</span>
          <h2 className="section-title text-center mx-auto">کارهای برجسته ما</h2>
          <p className="text-metal-600 mt-4">
            نمونه‌ای از بهترین پروژه‌های پرداخت‌کاری و پولیش فلزات که تاکنون انجام داده‌ایم
          </p>
        </div>

        {/* Filter buttons */}
        <div className={cn(
          'flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-100',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(category)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeFilter === category
                  ? 'bg-accent text-white'
                  : 'bg-white text-metal-700 hover:bg-metal-100'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item, index) => (
            <div 
              key={item.id}
              className={cn(
                'polished-card group transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                { 'delay-200': index % 3 === 0, 'delay-300': index % 3 === 1, 'delay-400': index % 3 === 2 }
              )}
            >
              <div className="image-container aspect-square">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-metal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-xs text-accent font-medium uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-xl font-display text-white mt-1">{item.title}</h3>
                    <p className="text-metal-200 text-sm mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
