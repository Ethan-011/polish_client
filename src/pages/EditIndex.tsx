import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, UserIcon } from 'lucide-react';
import EditHeroSection from '@/components/edit/EditHeroSection';
import EditAboutSection from '@/components/edit/EditAboutSection';
import EditServicesSection from '@/components/edit/EditServicesSection';
import EditPortfolioSection from '@/components/edit/EditPortfolioSection';
import EditContactSection from '@/components/edit/EditContactSection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ChangePasswordDialog from '@/components/edit/ChangePasswordDialog';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const EditIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  // Check if this is a first-time login
  useEffect(() => {



    const isFirstLogin = sessionStorage.getItem('isFirstLogin') === 'true';
    
    if (isFirstLogin) {

      // Show password change dialog
      setIsChangePasswordOpen(true);
      
      // Notify the user that they need to change their password
      toast({
        title: "تغییر رمز عبور",
        description: "لطفاً برای ادامه، رمز عبور خود را تغییر دهید.",
      });
    }
  }, [location, toast]);

  const handleLogout = () => {
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <UserIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setIsChangePasswordOpen(true)}>
              تغییر رمز عبور
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleLogout}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="hero">هیرو</TabsTrigger>
          <TabsTrigger value="about">درباره ما</TabsTrigger>
          <TabsTrigger value="services">خدمات</TabsTrigger>
          <TabsTrigger value="portfolio">نمونه کارها</TabsTrigger>
          <TabsTrigger value="contact">تماس با ما</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <EditHeroSection />
        </TabsContent>

        <TabsContent value="about">
          <EditAboutSection />
        </TabsContent>

        <TabsContent value="services">
          <EditServicesSection />
        </TabsContent>
        
        <TabsContent value="portfolio">
          <EditPortfolioSection />
        </TabsContent>

        <TabsContent value="contact">
          <EditContactSection />
        </TabsContent>
      </Tabs>

      <ChangePasswordDialog 
        open={isChangePasswordOpen} 
        onOpenChange={setIsChangePasswordOpen} 
        isFirstLogin={sessionStorage.getItem('isFirstLogin') === 'true'}
      />
    </div>
  );
};

export default EditIndex;
