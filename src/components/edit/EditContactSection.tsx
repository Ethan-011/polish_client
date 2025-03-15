
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const EditContactSection = () => {
  const { toast } = useToast();
  
  // Contact section form
  const contactForm = useForm({
    defaultValues: {
      contactTitle: "با ما در تماس باشید",
      contactDescription: "برای درخواست خدمات یا کسب اطلاعات بیشتر با ما تماس بگیرید",
      phoneNumber: "+98 123 456 7890",
      email: "info@example.com",
      address: "تهران، خیابان ولیعصر، پلاک 123"
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
