
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, LogOut } from 'lucide-react';
import EditHeroSection from '@/components/edit/EditHeroSection';
import EditAboutSection from '@/components/edit/EditAboutSection';
import EditServicesSection from '@/components/edit/EditServicesSection';
import EditPortfolioSection from '@/components/edit/EditPortfolioSection';
import EditContactSection from '@/components/edit/EditContactSection';

const EditIndex = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");

  const handleLogout = () => {
    // Here you would typically handle logout logic
    // For now, we'll just navigate to the login page
    navigate('/login');
  };

  return (
    <div className="container mx-auto py-8 px-4 rtl" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={() => navigate('/')} className="ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">ویرایش صفحه اصلی</h1>
        </div>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="ml-2 h-4 w-4" />
          خروج
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="hero">هیرو</TabsTrigger>
          <TabsTrigger value="about">درباره ما</TabsTrigger>
          <TabsTrigger value="services">خدمات</TabsTrigger>
          <TabsTrigger value="portfolio">نمونه کارها</TabsTrigger>
          <TabsTrigger value="contact">تماس با ما</TabsTrigger>
        </TabsList>

        {/* Hero Tab Content */}
        <TabsContent value="hero">
          <EditHeroSection />
        </TabsContent>

        {/* About Tab Content */}
        <TabsContent value="about">
          <EditAboutSection />
        </TabsContent>

        {/* Services Tab Content */}
        <TabsContent value="services">
          <EditServicesSection />
        </TabsContent>
        
        {/* Portfolio Tab Content */}
        <TabsContent value="portfolio">
          <EditPortfolioSection />
        </TabsContent>

        {/* Contact Tab Content */}
        <TabsContent value="contact">
          <EditContactSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditIndex;
