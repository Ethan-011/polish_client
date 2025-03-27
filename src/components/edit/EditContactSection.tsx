
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, MapPin } from "lucide-react";

const EditContactSection = () => {
  const { toast } = useToast();
  
  // Contact section form
  const contactForm = useForm({
    defaultValues: {
      contactTitle: "با ما در تماس باشید",
      contactDescription: "برای درخواست خدمات یا کسب اطلاعات بیشتر با ما تماس بگیرید",
      phoneNumber: "+98 123 456 7890",
      email: "info@example.com",
      address: "تهران، خیابان ولیعصر، پلاک 123",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207306.21758724176!2d51.18787880369053!3d35.69004254426945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1696423086805!5m2!1sen!2s",
      locationName: "میدان آزادی",
      latitude: "35.699450",
      longitude: "51.335952",
    }
  });

  const onSaveContact = (data: any) => {
    console.log("Contact data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش تماس با موفقیت ذخیره شد",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right">بخش تماس</CardTitle>
        <CardDescription className="text-right">اطلاعات بخش تماس با ما را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...contactForm}>
          <form onSubmit={contactForm.handleSubmit(onSaveContact)} className="space-y-4">
            <FormField
              control={contactForm.control}
              name="contactTitle"
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
              control={contactForm.control}
              name="contactDescription"
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
            
            <FormField
              control={contactForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={contactForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={contactForm.control}
              name="address"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={contactForm.control}
              name="mapEmbedUrl"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>آدرس نقشه (Google Maps Embed URL)</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-right h-24 text-xs" />
                  </FormControl>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-2 border rounded-lg overflow-hidden h-48">
                      <iframe
                        title="پیش‌نمایش نقشه"
                        src={field.value}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  )}
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={contactForm.control}
                name="locationName"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>نام مکان</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={contactForm.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>عرض جغرافیایی (Latitude)</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={contactForm.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>طول جغرافیایی (Longitude)</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md mt-2">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2 text-accent" />
                <span>چگونه مختصات مکان خود را پیدا کنید:</span>
              </div>
              <ol className="text-xs text-gray-500 space-y-1 pr-5 list-decimal">
                <li>به Google Maps بروید (maps.google.com)</li>
                <li>روی مکان مورد نظر خود راست کلیک کنید</li>
                <li>در منوی ظاهر شده، گزینه "مختصات" را انتخاب کنید</li>
                <li>اعداد را در فیلدهای بالا وارد کنید</li>
              </ol>
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

export default EditContactSection;
