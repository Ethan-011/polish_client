
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ServicesList from './services/ServicesList';
import ServicesHeader, { ServicesHeaderFormValues } from './services/ServicesHeader';
import { useServices } from './services/useServices';

const EditServicesSection = () => {
  const { toast } = useToast();
  const { 
    services, 
    handleServiceChange, 
    handleDeleteService, 
    handleAddService, 
    handleMoveService 
  } = useServices();
  
  const onSaveServices = (data: ServicesHeaderFormValues) => {
    console.log("Services data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش خدمات با موفقیت ذخیره شد",
    });
  };

  return (
    <Card className="rtl">
      <CardHeader>
        <CardTitle className="text-right">بخش خدمات</CardTitle>
        <CardDescription className="text-right">اطلاعات بخش خدمات را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <ServicesHeader onSave={onSaveServices} />
        
        <ServicesList 
          services={services}
          onServiceChange={handleServiceChange}
          onDeleteService={handleDeleteService}
          onMoveService={handleMoveService}
          onAddService={handleAddService}
        />
      </CardContent>
    </Card>
  );
};

export default EditServicesSection;
