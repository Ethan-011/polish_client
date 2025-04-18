
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, X } from "lucide-react";

const EditAboutSection = () => {
  const { toast } = useToast();
  
  // About section form with features array
  const aboutForm = useForm({
    defaultValues: {
      aboutTitle: "متخصص در پرداخت‌کاری و پولیش فلزات",
      aboutDescription: "با بیش از یک دهه تجربه در صنعت پرداخت‌کاری، ما به ارائه خدمات با کیفیت و حرفه‌ای در زمینه پولیش و پرداخت انواع فلزات متعهد هستیم. تخصص ما ترکیبی از دانش فنی، مهارت حرفه‌ای و استفاده از بهترین تجهیزات و مواد است.",
      aboutImage: "https://images.unsplash.com/photo-1605433663111-2a9b424e9656?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: [
        "بیش از ده سال تجربه در صنعت پرداخت‌کاری",
        "استفاده از مواد و تجهیزات با کیفیت",
        "تیم متخصص و حرفه‌ای",
        "ضمانت کیفیت خدمات",
        "قیمت‌گذاری منصفانه و شفاف",
        "تحویل به موقع پروژه‌ها"
      ]
    }
  });

  const addFeature = () => {
    const currentFeatures = aboutForm.getValues('features');
    aboutForm.setValue('features', [...currentFeatures, '']);
  };

  const removeFeature = (index: number) => {
    const currentFeatures = aboutForm.getValues('features');
    aboutForm.setValue('features', currentFeatures.filter((_, i) => i !== index));
  };

  const onSaveAbout = (data: any) => {
    // Filter out empty features
    data.features = data.features.filter((feature: string) => feature.trim() !== '');
    
    console.log("About data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش درباره ما با موفقیت ذخیره شد",
    });
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
              name="aboutTitle"
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
              name="aboutDescription"
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
              name="aboutImage"
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

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addFeature}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  افزودن ویژگی
                </Button>
                <FormLabel>ویژگی‌های کلیدی</FormLabel>
              </div>

              {aboutForm.watch('features').map((feature: string, index: number) => (
                <div key={index} className="flex gap-2 items-start">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeature(index)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <FormField
                    control={aboutForm.control}
                    name={`features.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} className="text-right" placeholder="ویژگی را وارد کنید" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
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

export default EditAboutSection;
