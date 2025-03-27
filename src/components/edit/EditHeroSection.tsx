
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, Link, Video, Image } from "lucide-react";
import ImageUploader from "@/components/ui/image-uploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const EditHeroSection = () => {
  const { toast } = useToast();
  const [imageInputMethod, setImageInputMethod] = useState<'upload' | 'url'>('upload');
  const [backgroundType, setBackgroundType] = useState<'image' | 'video'>('image');
  
  // Hero section form
  const heroForm = useForm({
    defaultValues: {
      heroTitle: "پرداخت کاری و پولیش حرفه‌ای فلزات",
      heroSubtitle: "با بیش از ده سال تجربه در صنعت پرداخت کاری، بهترین کیفیت و زیبایی را برای فلزات شما به ارمغان می‌آوریم.",
      heroBackground: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      backgroundType: "image"
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
              name="backgroundType"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>نوع پس‌زمینه</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      className="flex flex-row justify-end gap-4"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setBackgroundType(value as 'image' | 'video');
                      }}
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="image" id="option-image" />
                        <FormLabel htmlFor="option-image" className="flex items-center">
                          <Image className="h-4 w-4 ml-1" />
                          تصویر
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="video" id="option-video" />
                        <FormLabel htmlFor="option-video" className="flex items-center">
                          <Video className="h-4 w-4 ml-1" />
                          ویدیو
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={heroForm.control}
              name="heroBackground"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>
                    {backgroundType === 'image' ? 'تصویر پس‌زمینه' : 'ویدیو پس‌زمینه'}
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-4">
                      <Tabs 
                        value={imageInputMethod} 
                        onValueChange={(val) => setImageInputMethod(val as 'upload' | 'url')}
                        className="w-full"
                      >
                        <TabsList className="w-full grid grid-cols-2 mb-4">
                          <TabsTrigger value="upload">آپلود {backgroundType === 'image' ? 'تصویر' : 'ویدیو'}</TabsTrigger>
                          <TabsTrigger value="url">آدرس {backgroundType === 'image' ? 'تصویر' : 'ویدیو'}</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upload" className="mt-0">
                          <ImageUploader
                            defaultImage={field.value}
                            onImageSelected={(url) => {
                              field.onChange(url);
                            }}
                            className="w-full"
                            acceptTypes={backgroundType === 'image' 
                              ? "image/png, image/jpeg, image/jpg, image/gif" 
                              : "video/mp4, video/webm, video/ogg"}
                          />
                        </TabsContent>
                        
                        <TabsContent value="url" className="mt-0">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Input 
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              placeholder={`آدرس ${backgroundType === 'image' ? 'تصویر' : 'ویدیو'} را وارد کنید`}
                              className="text-right"
                            />
                            <Link className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      {field.value && backgroundType === 'image' && (
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
                      
                      {field.value && backgroundType === 'video' && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 text-right mb-2">
                            پیش‌نمایش ویدیو:
                          </p>
                          <div className="border rounded-md overflow-hidden">
                            <video 
                              src={field.value} 
                              className="w-full h-40 object-cover" 
                              controls
                              onError={(e) => {
                                const target = e.target as HTMLVideoElement;
                                target.poster = 'https://placehold.co/600x400?text=خطا+در+بارگذاری+ویدیو';
                                target.style.backgroundColor = '#000';
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-right mt-2">
                            آدرس ویدیو: {field.value.substring(0, 50)}{field.value.length > 50 ? '...' : ''}
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
