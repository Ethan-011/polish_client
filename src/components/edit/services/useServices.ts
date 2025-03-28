
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { services as defaultServices } from '@/components/Services';
import { Service } from './types';

export const useServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>(defaultServices);
  
  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    setServices(updatedServices);
  };

  const handleDeleteService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
    
    toast({
      title: "خدمت حذف شد",
      description: "خدمت مورد نظر با موفقیت حذف شد",
    });
  };

  const handleAddService = () => {
    const newService = {
      icon: <Plus className="h-8 w-8 text-accent" />,
      title: "خدمت جدید",
      description: "توضیحات خدمت جدید را اینجا وارد کنید"
    };
    
    setServices([...services, newService]);
    
    toast({
      title: "خدمت جدید اضافه شد",
      description: "یک خدمت جدید اضافه شد. لطفا اطلاعات آن را ویرایش کنید",
    });
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === services.length - 1)
    ) {
      return;
    }
    
    const updatedServices = [...services];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the services
    [updatedServices[index], updatedServices[newIndex]] = [updatedServices[newIndex], updatedServices[index]];
    
    setServices(updatedServices);
  };

  return {
    services,
    handleServiceChange,
    handleDeleteService,
    handleAddService,
    handleMoveService
  };
};
