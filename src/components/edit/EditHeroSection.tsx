
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, Link } from "lucide-react";
import ImageUploader from "@/components/ui/image-uploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditHeroSection = () => {
  const { toast } = useToast();
  const [imageInputMethod, setImageInputMethod] = useState<'upload' | 'url'>('upload');
  
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
                  <FormLabel>تصویر پس‌زمینه</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-4">
                      <Tabs 
                        value={imageInputMethod} 
                        onValueChange={(val) => setImageInputMethod(val as 'upload' | 'url')}
                        className="w-full"
                      >
                        <TabsList className="w-full grid grid-cols-2 mb-4">
                          <TabsTrigger value="upload">آپلود تصویر</TabsTrigger>
                          <TabsTrigger value="url">آدرس تصویر</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upload" className="mt-0">
                          <ImageUploader
                            defaultImage={field.value}
                            onImageSelected={(imageUrl) => {
                              field.onChange(imageUrl);
                            }}
                            className="w-full"
                          />
                        </TabsContent>
                        
                        <TabsContent value="url" className="mt-0">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Input 
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder="آدرس تصویر را وارد کنید"
                              className="text-right"
                            />
                            <Link className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      {field.value && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 text-right mb-2">
                            پیش‌نمایش تصویر:
                          </p>
                          <div className="border rounded-md overflow-hidden">
                            <img 
                              src={field.value} 
                              alt="پیش‌نمایش" 
                              className="w-full h-40 object-cover" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=خطا+در+بارگذاری+تصویر';
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-right mt-2">
                            آدرس تصویر: {field.value.substring(0, 50)}{field.value.length > 50 ? '...' : ''}
                          </p>
                        </div>
                      )}
                    </div>
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
