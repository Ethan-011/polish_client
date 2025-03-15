
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const EditIndex = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");

  // Hero section form
  const heroForm = useForm({
    defaultValues: {
      heroTitle: "پرداخت کاری و پولیش حرفه‌ای فلزات",
      heroSubtitle: "با بیش از ده سال تجربه در صنعت پرداخت کاری، بهترین کیفیت و زیبایی را برای فلزات شما به ارمغان می‌آوریم.",
      heroImage: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
    }
  });

  // About section form
  const aboutForm = useForm({
    defaultValues: {
      aboutTitle: "متخصص در پرداخت‌کاری و پولیش فلزات",
      aboutDescription: "با بیش از یک دهه تجربه در صنعت پرداخت‌کاری، ما به ارائه خدمات با کیفیت و حرفه‌ای در زمینه پولیش و پرداخت انواع فلزات متعهد هستیم. تخصص ما ترکیبی از دانش فنی، مهارت حرفه‌ای و استفاده از بهترین تجهیزات و مواد است.",
      aboutImage: "https://images.unsplash.com/photo-1605433663111-2a9b424e9656?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  });

  // Services section form
  const servicesForm = useForm({
    defaultValues: {
      servicesTitle: "خدمات پولیش و پرداخت",
      servicesDescription: "ما طیف گسترده‌ای از خدمات پرداخت‌کاری و پولیش فلزات را با بالاترین استانداردهای کیفی ارائه می‌دهیم"
    }
  });

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

  const onSaveHero = (data: any) => {
    console.log("Hero data saved:", data);
    // Here you would typically save this data to a backend/database
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش هیرو با موفقیت ذخیره شد",
    });
  };

  const onSaveAbout = (data: any) => {
    console.log("About data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش درباره ما با موفقیت ذخیره شد",
    });
  };

  const onSaveServices = (data: any) => {
    console.log("Services data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش خدمات با موفقیت ذخیره شد",
    });
  };

  const onSaveContact = (data: any) => {
    console.log("Contact data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش تماس با موفقیت ذخیره شد",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={() => navigate('/')} className="ml-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">ویرایش صفحه اصلی</h1>
        </div>
        <Button 
          onClick={() => navigate('/')}
          variant="default"
        >
          مشاهده وب‌سایت
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="hero">هیرو</TabsTrigger>
          <TabsTrigger value="about">درباره ما</TabsTrigger>
          <TabsTrigger value="services">خدمات</TabsTrigger>
          <TabsTrigger value="contact">تماس</TabsTrigger>
        </TabsList>

        {/* Hero Tab Content */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>بخش هیرو</CardTitle>
              <CardDescription>اطلاعات بخش اصلی صفحه اول را ویرایش کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...heroForm}>
                <form onSubmit={heroForm.handleSubmit(onSaveHero)} className="space-y-4">
                  <FormField
                    control={heroForm.control}
                    name="heroTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان اصلی</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={heroForm.control}
                    name="heroSubtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>زیرعنوان</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={heroForm.control}
                    name="heroImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>آدرس تصویر پس‌زمینه</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
        </TabsContent>

        {/* About Tab Content */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>بخش درباره ما</CardTitle>
              <CardDescription>اطلاعات بخش درباره ما را ویرایش کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...aboutForm}>
                <form onSubmit={aboutForm.handleSubmit(onSaveAbout)} className="space-y-4">
                  <FormField
                    control={aboutForm.control}
                    name="aboutTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={aboutForm.control}
                    name="aboutDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={aboutForm.control}
                    name="aboutImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>آدرس تصویر</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
        </TabsContent>

        {/* Services Tab Content */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>بخش خدمات</CardTitle>
              <CardDescription>اطلاعات بخش خدمات را ویرایش کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...servicesForm}>
                <form onSubmit={servicesForm.handleSubmit(onSaveServices)} className="space-y-4">
                  <FormField
                    control={servicesForm.control}
                    name="servicesTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={servicesForm.control}
                    name="servicesDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
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
        </TabsContent>

        {/* Contact Tab Content */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>بخش تماس</CardTitle>
              <CardDescription>اطلاعات بخش تماس با ما را ویرایش کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(onSaveContact)} className="space-y-4">
                  <FormField
                    control={contactForm.control}
                    name="contactTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="contactDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>شماره تماس</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ایمیل</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={contactForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>آدرس</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditIndex;
