
import React from 'react';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-metal-900 text-white" dir="rtl">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6">پولیش‌کاری حرفه‌ای</h3>
            <p className="text-metal-300 mb-6">
              ارائه خدمات حرفه‌ای پرداخت و پولیش انواع فلزات با بالاترین کیفیت و دقت
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="bg-metal-800 hover:bg-accent transition-colors duration-300 p-2 rounded-full">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-metal-800 hover:bg-accent transition-colors duration-300 p-2 rounded-full">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-metal-800 hover:bg-accent transition-colors duration-300 p-2 rounded-full">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">دسترسی سریع</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-metal-300 hover:text-accent transition-colors duration-300">صفحه اصلی</a>
              </li>
              <li>
                <a href="#services" className="text-metal-300 hover:text-accent transition-colors duration-300">خدمات ما</a>
              </li>
              <li>
                <a href="#portfolio" className="text-metal-300 hover:text-accent transition-colors duration-300">نمونه کارها</a>
              </li>
              <li>
                <a href="#about" className="text-metal-300 hover:text-accent transition-colors duration-300">درباره ما</a>
              </li>
              <li>
                <a href="#contact" className="text-metal-300 hover:text-accent transition-colors duration-300">تماس با ما</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">خدمات پولیش کاری</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-metal-300 hover:text-accent transition-colors duration-300">پولیش استیل ضد زنگ</a>
              </li>
              <li>
                <a href="#" className="text-metal-300 hover:text-accent transition-colors duration-300">پولیش آلومینیوم</a>
              </li>
              <li>
                <a href="#" className="text-metal-300 hover:text-accent transition-colors duration-300">پرداخت برنج و مس</a>
              </li>
              <li>
                <a href="#" className="text-metal-300 hover:text-accent transition-colors duration-300">پرداخت قطعات صنعتی</a>
              </li>
              <li>
                <a href="#" className="text-metal-300 hover:text-accent transition-colors duration-300">احیای سطوح فرسوده</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">اطلاعات تماس</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mt-1 ml-3 flex-shrink-0" />
                <span className="text-metal-300">تهران، خیابان مثال، کوچه نمونه، پلاک 123</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent ml-3 flex-shrink-0" />
                <span className="text-metal-300">021-12345678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent ml-3 flex-shrink-0" />
                <span className="text-metal-300">info@metalpolishing.example</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-metal-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-metal-400 text-sm">
              © {currentYear} پولیش‌کاری حرفه‌ای. تمامی حقوق محفوظ است.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 rtl:space-x-reverse text-sm text-metal-400">
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-300">شرایط استفاده</a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-300">حریم خصوصی</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
