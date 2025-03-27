
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const EditServicesSection = () => {
  const { toast } = useToast();
  
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

  return (
    <Card>
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
