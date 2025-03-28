
import React from 'react';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export interface ServicesHeaderFormValues {
  servicesTitle: string;
  servicesDescription: string;
}

interface ServicesHeaderProps {
  onSave: (data: ServicesHeaderFormValues) => void;
}

const ServicesHeader = ({ onSave }: ServicesHeaderProps) => {
  const servicesForm = useForm<ServicesHeaderFormValues>({
    defaultValues: {
      servicesTitle: "خدمات پولیش و پرداخت",
      servicesDescription: "ما طیف گسترده‌ای از خدمات پرداخت‌کاری و پولیش فلزات را با بالاترین استانداردهای کیفی ارائه می‌دهیم"
    }
  });

  return (
    <Form {...servicesForm}>
      <form onSubmit={servicesForm.handleSubmit(onSave)} className="space-y-4">
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
  );
};

export default ServicesHeader;
