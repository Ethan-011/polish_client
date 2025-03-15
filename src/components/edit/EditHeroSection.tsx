
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const EditHeroSection = () => {
  const { toast } = useToast();
  
  // Hero section form
  const heroForm = useForm({
    defaultValues: {
      heroTitle: "پرداخت کاری و پولیش حرفه‌ای فلزات",
      heroSubtitle: "با بیش از ده سال تجربه در صنعت پرداخت کاری، بهترین کیفیت و زیبایی را برای فلزات شما به ارمغان می‌آوریم.",
      heroImage: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    }
  });

  const onSaveHero = (data: any) => {
    console.log("Hero data saved:", data);
    // Here you would typically save this data to a backend/database
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش هیرو با موفقیت ذخیره شد",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">بخش هیرو</CardTitle>
        <CardDescription className="text-right">اطلاعات بخش اصلی صفحه اول را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...heroForm}>
          <form onSubmit={heroForm.handleSubmit(onSaveHero)} className="space-y-4">
            <FormField
              control={heroForm.control}
              name="heroTitle"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>عنوان اصلی</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={heroForm.control}
              name="heroSubtitle"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>زیرعنوان</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={heroForm.control}
              name="heroImage"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>آدرس تصویر پس‌زمینه</FormLabel>
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

export default EditHeroSection;
