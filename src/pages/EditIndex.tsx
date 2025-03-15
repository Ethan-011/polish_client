
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
import { ArrowLeft, Save, Plus, Trash2, Image, Edit } from "lucide-react";

// Define portfolio item type
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const EditIndex = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hero");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "پولیش استیل ضد زنگ",
      category: "استیل",
      image: "https://images.unsplash.com/photo-1551884831-bbf3cdc4eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پرداخت و براق‌سازی قطعات استیل با بالاترین کیفیت"
    },
    {
      id: 2,
      title: "پولیش آلومینیوم",
      category: "آلومینیوم",
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "براق‌سازی و احیای سطوح آلومینیومی"
    },
    {
      id: 3,
      title: "پرداخت برنج و مس",
      category: "برنج و مس",
      image: "https://images.unsplash.com/photo-1563456020159-bc38d9279b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پولیش تخصصی قطعات برنجی و مسی برای درخشندگی بی‌نظیر"
    },
    {
      id: 4,
      title: "پرداخت قطعات صنعتی",
      category: "صنعتی",
      image: "https://images.unsplash.com/photo-1533667586627-9f5ddbd42539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پولیش دقیق قطعات صنعتی با اهمیت بالا"
    },
    {
      id: 5,
      title: "پولیش قطعات تزئینی",
      category: "تزئینی",
      image: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پرداخت ظریف و حرفه‌ای قطعات تزئینی و دکوراتیو"
    },
    {
      id: 6,
      title: "احیای سطوح فرسوده",
      category: "احیا",
      image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "بازسازی و احیای سطوح فلزی قدیمی و آسیب‌دیده"
    },
  ]);
  
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  
  // Portfolio form
  const portfolioForm = useForm({
    defaultValues: {
      title: "",
      category: "",
      image: "",
      description: ""
    }
  });
  
  // Portfolio form for editing
  const portfolioSectionForm = useForm({
    defaultValues: {
      portfolioTitle: "کارهای برجسته ما",
      portfolioDescription: "نمونه‌ای از بهترین پروژه‌های پرداخت‌کاری و پولیش فلزات که تاکنون انجام داده‌ایم"
    }
  });

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
  
  // Handle saving portfolio section title & description
  const onSavePortfolioSection = (data: any) => {
    console.log("Portfolio section data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش نمونه کارها با موفقیت ذخیره شد",
    });
  };
  
  // Add/Edit portfolio item
  const handlePortfolioItem = (data: any) => {
    if (editingItem) {
      // Edit existing item
      setPortfolioItems(
        portfolioItems.map(item => 
          item.id === editingItem.id ? { ...item, ...data } : item
        )
      );
      setEditingItem(null);
      toast({
        title: "ویرایش شد",
        description: "نمونه کار با موفقیت ویرایش شد",
      });
    } else {
      // Add new item
      setPortfolioItems([
        ...portfolioItems,
        {
          id: Date.now(),
          ...data
        }
      ]);
      toast({
        title: "افزوده شد",
        description: "نمونه کار جدید با موفقیت افزوده شد",
      });
    }
    portfolioForm.reset();
  };
  
  // Start editing an item
  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item);
    portfolioForm.reset({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description
    });
  };
  
  // Delete portfolio item
  const handleDeleteItem = (id: number) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    toast({
      title: "حذف شد",
      description: "نمونه کار با موفقیت حذف شد",
    });
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingItem(null);
    portfolioForm.reset({
      title: "",
      category: "",
      image: "",
      description: ""
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
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="hero">هیرو</TabsTrigger>
          <TabsTrigger value="about">درباره ما</TabsTrigger>
          <TabsTrigger value="services">خدمات</TabsTrigger>
          <TabsTrigger value="portfolio">نمونه کارها</TabsTrigger>
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
        
        {/* Portfolio Tab Content */}
        <TabsContent value="portfolio">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>بخش نمونه کارها</CardTitle>
              <CardDescription>عنوان و توضیحات بخش نمونه کارها را ویرایش کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...portfolioSectionForm}>
                <form onSubmit={portfolioSectionForm.handleSubmit(onSavePortfolioSection)} className="space-y-4">
                  <FormField
                    control={portfolioSectionForm.control}
                    name="portfolioTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عنوان بخش</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={portfolioSectionForm.control}
                    name="portfolioDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>توضیحات بخش</FormLabel>
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
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingItem ? 'ویرایش نمونه کار' : 'افزودن نمونه کار جدید'}</CardTitle>
              <CardDescription>
                {editingItem ? 'اطلاعات نمونه کار را ویرایش کنید' : 'یک نمونه کار جدید به گالری اضافه کنید'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...portfolioForm}>
                <form onSubmit={portfolioForm.handleSubmit(handlePortfolioItem)} className="space-y-4">
                  <FormField
                    control={portfolioForm.control}
                    name="title"
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
                    control={portfolioForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>دسته‌بندی</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={portfolioForm.control}
                    name="image"
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
                  
                  <FormField
                    control={portfolioForm.control}
                    name="description"
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
                  
                  <div className="flex gap-2 mt-4">
                    <Button type="submit">
                      {editingItem ? (
                        <>
                          <Edit className="ml-2 h-4 w-4" />
                          ویرایش نمونه کار
                        </>
                      ) : (
                        <>
                          <Plus className="ml-2 h-4 w-4" />
                          افزودن نمونه کار
                        </>
                      )}
                    </Button>
                    {editingItem && (
                      <Button type="button" variant="outline" onClick={handleCancelEdit}>
                        انصراف
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>مدیریت نمونه کارها</CardTitle>
              <CardDescription>نمونه کارهای موجود را مدیریت کنید</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded">
                    <div className="flex items-center">
                      <div className="w-16 h-16 overflow-hidden rounded mr-4">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
