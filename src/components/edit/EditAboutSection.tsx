
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import {update_about} from '@/context/AboutContext'
import {About} from '@/types/Types'

const EditAboutSection = () => {
  const { toast } = useToast();
  
  // About section form
  const aboutForm = useForm({
    defaultValues: {
      title: "متخصص در پرداخت‌کاری و پولیش فلزات",
      description: "با بیش از یک دهه تجربه در صنعت پرداخت‌کاری، ما به ارائه خدمات با کیفیت و حرفه‌ای در زمینه پولیش و پرداخت انواع فلزات متعهد هستیم. تخصص ما ترکیبی از دانش فنی، مهارت حرفه‌ای و استفاده از بهترین تجهیزات و مواد است.",
      background_address: "https://images.unsplash.com/photo-1605433663111-2a9b424e9656?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  });

  const onSaveAbout = async (data: any) => {
    console.log("About data saved:", data);

    const resp:string =  await update_about(data);
    if(resp == "ABOUT updated successfully")
    {
      toast({
        title: "ذخیره شد",
        description: "اطلاعات بخش درباره ما با موفقیت ذخیره شد",
      });

    }
    else
    {

      toast({
        title: "خطا",
        description: "اطلاعات بخش درباره ما با با خطا مواجه شد",
      });


    }

  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">بخش درباره ما</CardTitle>
        <CardDescription className="text-right">اطلاعات بخش درباره ما را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...aboutForm}>
          <form onSubmit={aboutForm.handleSubmit(onSaveAbout)} className="space-y-4">
            <FormField
              control={aboutForm.control}
              name="title"
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
              control={aboutForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={aboutForm.control}
              name="background_address"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>آدرس تصویر</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
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

export default EditAboutSection;
