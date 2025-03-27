
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Portfolio, { portfolioItems } from '@/components/Portfolio';
import Services, { services } from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

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

  // Determine which sections to show based on content availability
  const showPortfolio = portfolioItems.length > 0;
  const showServices = services.length > 0;

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      {showPortfolio && <Portfolio />}
      {showServices && <Services />}
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
