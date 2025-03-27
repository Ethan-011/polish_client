
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Map from '@/components/Map';

const Index = () => {
  useEffect(() => {
    // Reveal elements on scroll
    const revealOnScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      const windowHeight = window.innerHeight;
      
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Map />
      <Footer />
    </div>
  );
};

export default Index;
