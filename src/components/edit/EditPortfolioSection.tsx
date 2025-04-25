import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Edit, ChevronUp, ChevronDown, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ImageUploader from "@/components/ui/image-uploader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {update_portfolios} from "@/context/PortfolioContext";
import {Portfolio} from "@/types/Types"

// Define portfolio item type
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  priority: number;
}

const EditPortfolioSection = () => {
  const { toast } = useToast();
  const [originalPortfolioItems, setOriginalPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "پولیش استیل ضد زنگ",
      category: "استیل",
      image: "https://images.unsplash.com/photo-1551884831-bbf3cdc4eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پرداخت و براق‌سازی قطعات استیل با بالاترین کیفیت",
      priority: 1
    },
    {
      id: 2,
      title: "پولیش آلومینیوم",
      category: "آلومینیوم",
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "براق‌سازی و احیای سطوح آلومینیومی",
      priority: 2
    },
    {
      id: 3,
      title: "پرداخت برنج و مس",
      category: "برنج و مس",
      image: "https://images.unsplash.com/photo-1563456020159-bc38d9279b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پولیش تخصصی قطعات برنجی و مسی برای درخشندگی بی‌نظیر",
      priority: 3
    },
    {
      id: 4,
      title: "پرداخت قطعات صنعتی",
      category: "صنعتی",
      image: "https://images.unsplash.com/photo-1533667586627-9f5ddbd42539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پولیش دقیق قطعات صنعتی با اهمیت بالا",
      priority: 4
    },
    {
      id: 5,
      title: "پولیش قطعات تزئینی",
      category: "تزئینی",
      image: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "پرداخت ظریف و حرفه‌ای قطعات تزئینی و دکوراتیو",
      priority: 5
    },
    {
      id: 6,
      title: "احیای سطوح فرسوده",
      category: "احیا",
      image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "بازسازی و احیای سطوح فلزی قدیمی و آسیب‌دیده",
      priority: 6
    },
  ]);
  
  const [editedPortfolioItems, setEditedPortfolioItems] = useState<PortfolioItem[]>(originalPortfolioItems);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Portfolio form
  const portfolioForm = useForm({
    defaultValues: {
      title: "",
      category: "",
      thumbnailUrl: "",
      description: ""
    }
  });
  
  // Portfolio section form
  const portfolioSectionForm = useForm({
    defaultValues: {
      portfolioTitle: "کارهای برجسته ما",
      portfolioDescription: "نمونه‌ای از بهترین پروژه‌های پرداخت‌کاری و پولیش فلزات که تاکنون انجام داده‌ایم"
    }
  });
  
  // Handle saving all changes
  const onSaveAll = (data: any) => {
    // Update the original items with edited items
    setOriginalPortfolioItems(editedPortfolioItems);
    console.log("All changes saved:", {
      sectionData: data,
      portfolioItems: editedPortfolioItems
    });
    toast({
      title: "ذخیره شد",
      description: "تمامی تغییرات با موفقیت ذخیره شد",
    });
  };
  
  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    portfolioForm.setValue("thumbnailUrl", imageUrl);
  };
  
  // Add/Edit portfolio item (staged changes)
  const handlePortfolioItem = (data: any) => {
    if (editingItem) {
      // Edit existing item
      setEditedPortfolioItems(
        editedPortfolioItems.map(item => 
          item.id === editingItem.id ? { ...item, ...data } : item
        )
      );
      setEditingItem(null);
      setIsDialogOpen(false);
      toast({
        title: "تغییرات موقت",
        description: "تغییرات اعمال شد. برای ذخیره نهایی، دکمه ذخیره تغییرات را بزنید",
      });
    } else {
      // Add new item
      const newPriority = editedPortfolioItems.length > 0 
        ? Math.max(...editedPortfolioItems.map(item => item.priority)) + 1 
        : 1;
        
      setEditedPortfolioItems([
        ...editedPortfolioItems,
        {
          id: Date.now(),
          priority: newPriority,
          ...data
        }
      ]);
      setIsDialogOpen(false);
      toast({
        title: "تغییرات موقت",
        description: "نمونه کار جدید اضافه شد. برای ذخیره نهایی، دکمه ذخیره تغییرات را بزنید",
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
      thumbnailUrl: item.image,
      description: item.description
    });
    setIsDialogOpen(true);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingItem(null);
    setIsDialogOpen(false);
    portfolioForm.reset({
      title: "",
      category: "",
      thumbnailUrl: "",
      description: ""
    });
  };
  
  // Delete portfolio item (staged)
  const handleDeleteItem = (id: number) => {
    setEditedPortfolioItems(editedPortfolioItems.filter(item => item.id !== id));
    toast({
      title: "تغییرات موقت",
      description: "نمونه کار حذف شد. برای ذخیره نهایی، دکمه ذخیره تغییرات را بزنید",
    });
  };
  
  // Move item up (staged)
  const moveItemUp = (id: number) => {
    const itemIndex = editedPortfolioItems.findIndex(item => item.id === id);
    if (itemIndex > 0) {
      const updatedItems = [...editedPortfolioItems];
      const currentPriority = updatedItems[itemIndex].priority;
      const prevPriority = updatedItems[itemIndex - 1].priority;
      
      updatedItems[itemIndex].priority = prevPriority;
      updatedItems[itemIndex - 1].priority = currentPriority;
      
      updatedItems.sort((a, b) => a.priority - b.priority);
      setEditedPortfolioItems(updatedItems);
      
      toast({
        title: "تغییرات موقت",
        description: "اولویت تغییر کرد. برای ذخیره نهایی، دکمه ذخیره تغییرات را بزنید",
      });
    }
  };
  
  // Move item down (staged)
  const moveItemDown = (id: number) => {
    const itemIndex = editedPortfolioItems.findIndex(item => item.id === id);
    if (itemIndex < editedPortfolioItems.length - 1) {
      const updatedItems = [...editedPortfolioItems];
      const currentPriority = updatedItems[itemIndex].priority;
      const nextPriority = updatedItems[itemIndex + 1].priority;
      
      updatedItems[itemIndex].priority = nextPriority;
      updatedItems[itemIndex + 1].priority = currentPriority;
      
      updatedItems.sort((a, b) => a.priority - b.priority);
      setEditedPortfolioItems(updatedItems);
      
      toast({
        title: "تغییرات موقت",
        description: "اولویت تغییر کرد. برای ذخیره نهایی، دکمه ذخیره تغییرات را بزنید",
      });
    }
  };
  
  // Sort portfolio items by priority
  const sortedPortfolioItems = [...editedPortfolioItems].sort((a, b) => a.priority - b.priority);
  
  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-right">بخش نمونه کارها</CardTitle>
          <CardDescription className="text-right">عنوان و توضیحات بخش نمونه کارها را ویرایش کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...portfolioSectionForm}>
            <form onSubmit={portfolioSectionForm.handleSubmit(onSaveAll)} className="space-y-4">
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
          <div className="flex justify-between items-center">
            <Button type="button" onClick={() => setIsDialogOpen(true)}>
              <Plus className="ml-2 h-4 w-4" />
              افزودن نمونه کار
            </Button>
            <div>
              <CardTitle className="text-right">مدیریت نمونه کارها</CardTitle>
              <CardDescription className="text-right">نمونه کارهای موجود را مدیریت و اولویت‌بندی کنید</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {editedPortfolioItems.length === 0 ? (
            <Alert className="border-accent/50 bg-accent/10">
              <Info className="h-4 w-4 text-accent" />
              <AlertDescription className="text-right mr-2">
                نمونه کاری وجود ندارد
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">تصویر</TableHead>
                  <TableHead className="text-right">عنوان</TableHead>
                  <TableHead className="text-right">دسته‌بندی</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPortfolioItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="w-16 h-16 overflow-hidden rounded">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditItem(item)}
                          title="ویرایش"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => moveItemUp(item.id)}
                          disabled={index === 0}
                          title="افزایش اولویت"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => moveItemDown(item.id)}
                          disabled={index === sortedPortfolioItems.length - 1}
                          title="کاهش اولویت"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-right">{editingItem ? 'ویرایش نمونه کار' : 'افزودن نمونه کار جدید'}</DialogTitle>
            <DialogDescription className="text-right">
              {editingItem ? 'اطلاعات نمونه کار را ویرایش کنید' : 'یک نمونه کار جدید به گالری اضافه کنید'}
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
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem className="text-right">
                      <FormLabel>تصویر</FormLabel>
                      <FormControl>
                        <div>
                          <ImageUploader 
                            defaultImage={field.value}
                            onImageSelected={handleImageUpload}
                            className="mb-2"
                          />
                          <Input 
                            {...field} 
                            className="text-right" 
                            placeholder="یا آدرس تصویر را وارد کنید"
                          />
                        </div>
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

