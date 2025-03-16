import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Image, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Define portfolio item type
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const EditPortfolioSection = () => {
  const { toast } = useToast();
  
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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
      setIsDialogOpen(false);
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
    setIsDialogOpen(true);
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
    setIsDialogOpen(false);
    portfolioForm.reset({
      title: "",
      category: "",
      image: "",
      description: ""
    });
  };
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-right">بخش نمونه کارها</CardTitle>
          <CardDescription className="text-right">عنوان و توضیحات بخش نمونه کارها را ویرایش کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...portfolioSectionForm}>
            <form onSubmit={portfolioSectionForm.handleSubmit(onSavePortfolioSection)} className="space-y-4">
              <FormField
                control={portfolioSectionForm.control}
                name="portfolioTitle"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>عنوان بخش</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={portfolioSectionForm.control}
                name="portfolioDescription"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>توضیحات بخش</FormLabel>
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
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-right">{editingItem ? 'ویرایش نمونه کار' : 'افزودن نمونه کار جدید'}</CardTitle>
          <CardDescription className="text-right">
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
                control={portfolioForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>دسته‌بندی</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={portfolioForm.control}
                name="image"
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
              
              <FormField
                control={portfolioForm.control}
                name="description"
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
          <CardTitle className="text-right">مدیریت نمونه کارها</CardTitle>
          <CardDescription className="text-right">نمونه کارهای موجود را مدیریت کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded">
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
                <div className="flex items-center text-right">
                  <div className="mr-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="w-16 h-16 overflow-hidden rounded">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-right">ویرایش نمونه کار</DialogTitle>
            <DialogDescription className="text-right">
              اطلاعات نمونه کار را ویرایش کنید
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Form {...portfolioForm}>
              <form onSubmit={portfolioForm.handleSubmit(handlePortfolioItem)} className="space-y-4">
                <FormField
                  control={portfolioForm.control}
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
                  control={portfolioForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel>دسته‌بندی</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-right" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={portfolioForm.control}
                  name="image"
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
                
                <FormField
                  control={portfolioForm.control}
                  name="description"
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
                
                <div className="flex gap-2 justify-end mt-4">
                  <Button type="submit">
                    <Edit className="ml-2 h-4 w-4" />
                    ذخیره تغییرات
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    انصراف
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditPortfolioSection;
