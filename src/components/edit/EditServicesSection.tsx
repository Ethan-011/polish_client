
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2, Plus, Move } from "lucide-react";
import { services as defaultServices } from '@/components/Services';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EditServicesSection = () => {
  const { toast } = useToast();
  const [services, setServices] = useState(defaultServices);
  
  // Services section form
  const servicesForm = useForm({
    defaultValues: {
      servicesTitle: "خدمات پولیش و پرداخت",
      servicesDescription: "ما طیف گسترده‌ای از خدمات پرداخت‌کاری و پولیش فلزات را با بالاترین استانداردهای کیفی ارائه می‌دهیم"
    }
  });

  const onSaveServices = (data: any) => {
    console.log("Services data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش خدمات با موفقیت ذخیره شد",
    });
  };

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

  return (
    <Card className="rtl">
      <CardHeader>
        <CardTitle className="text-right">بخش خدمات</CardTitle>
        <CardDescription className="text-right">اطلاعات بخش خدمات را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...servicesForm}>
          <form onSubmit={servicesForm.handleSubmit(onSaveServices)} className="space-y-4">
            <FormField
              control={servicesForm.control}
              name="servicesTitle"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>عنوان</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={servicesForm.control}
              name="servicesDescription"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border rounded-lg p-4 mt-6">
              <h3 className="text-lg font-medium mb-4 text-right">لیست خدمات</h3>
              
              <Accordion type="multiple" className="w-full">
                {services.map((service, index) => (
                  <AccordionItem key={index} value={`service-${index}`} className="border-b">
                    <AccordionTrigger className="flex flex-row-reverse justify-between py-4">
                      <span className="text-right">{service.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="text-right">
                          <FormLabel>عنوان خدمت</FormLabel>
                          <Input 
                            value={service.title} 
                            onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                            className="text-right mt-1" 
                          />
                        </div>
                        
                        <div className="text-right">
                          <FormLabel>توضیحات</FormLabel>
                          <Textarea 
                            value={service.description} 
                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                            className="text-right mt-1" 
                          />
                        </div>
                        
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMoveService(index, 'up')}
                              disabled={index === 0}
                            >
                              ↑
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMoveService(index, 'down')}
                              disabled={index === services.length - 1}
                            >
                              ↓
                            </Button>
                          </div>
                          
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteService(index)}
                          >
                            <Trash2 className="ml-2 h-4 w-4" />
                            حذف خدمت
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-4"
                onClick={handleAddService}
              >
                <Plus className="ml-2 h-4 w-4" />
                افزودن خدمت جدید
              </Button>
            </div>
            
            <Button type="submit" className="mt-4">
              <Save className="ml-2 h-4 w-4" />
              ذخیره تغییرات
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditServicesSection;
