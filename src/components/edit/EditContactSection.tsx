
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, MapPin, Plus, Trash2, Phone, MessageSquare, MousePointer, Crosshair } from "lucide-react";
import { useEffect, useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Map from '@/components/Map';
import {update_contact} from '@/context/ContactContext'
import {Contact} from '@/types/Types'

interface PhoneNumber {
  id: string;
  value: string;
  type: 'call' | 'whatsapp' | 'both';
}

interface WorkHours {
  days: string;
  hours: string;
}

const EditContactSection = () => {
  const { toast } = useToast();
  
  // State for multiple phone numbers
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    { id: '1', value: '+98 123 456 7890', type: 'call' }
  ]);
  
  // State for work hours
  const [workHours, setWorkHours] = useState<WorkHours[]>([
    { days: 'شنبه تا چهارشنبه', hours: '8:00 - 17:00' },
    { days: 'پنج‌شنبه', hours: '8:00 - 13:00' },
    { days: 'جمعه', hours: 'تعطیل' }
  ]);

  // Contact section form
  const contactForm = useForm({
    defaultValues: {
      contactTitle: "با ما در تماس باشید",
      contactDescription: "برای درخواست خدمات یا کسب اطلاعات بیشتر با ما تماس بگیرید",
      email: "info@example.com",
      address: "تهران، خیابان ولیعصر، پلاک 123",
      locationName: "میدان آزادی",
      latitude: "35.699450",
      longitude: "51.335952",
    }
  });

  // Handle adding a new phone number
  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { id: Date.now().toString(), value: '', type: 'call' }]);
  };

  // Handle removing a phone number
  const removePhoneNumber = (id: string) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter(phone => phone.id !== id));
    } else {
      toast({
        title: "خطا",
        description: "حداقل یک شماره تماس باید وجود داشته باشد",
        variant: "destructive"
      });
    }
  };

  // Handle phone number change
  const handlePhoneChange = (id: string, value: string) => {
    const updatedPhones = phoneNumbers.map(phone => 
      phone.id === id ? { ...phone, value } : phone
    );
    setPhoneNumbers(updatedPhones);
  };

  // Handle phone type change
  const handlePhoneTypeChange = (id: string, type: 'call' | 'whatsapp' | 'both') => {
    const updatedPhones = phoneNumbers.map(phone => 
      phone.id === id ? { ...phone, type } : phone
    );
    setPhoneNumbers(updatedPhones);
  };

  // Handle work hours change
  const handleWorkHoursChange = (index: number, field: 'days' | 'hours', value: string) => {
    const updatedHours = [...workHours];
    updatedHours[index][field] = value;
    setWorkHours(updatedHours);
  };

  // Add new work hours row
  const addWorkHours = () => {
    setWorkHours([...workHours, { days: '', hours: '' }]);
  };

  // Remove work hours row
  const removeWorkHours = (index: number) => {
    if (workHours.length > 1) {
      const updatedHours = [...workHours];
      updatedHours.splice(index, 1);
      setWorkHours(updatedHours);
    } else {
      toast({
        title: "خطا",
        description: "حداقل یک ردیف ساعت کاری باید وجود داشته باشد",
        variant: "destructive"
      });
    }
  };

  // Handle location change from map
  const handleLocationChange = (lat: number, lng: number) => {
    // Update form values with new coordinates
    contactForm.setValue('latitude', lat.toFixed(6));
    contactForm.setValue('longitude', lng.toFixed(6));
    
    // Show success toast
    toast({
      title: "موقعیت جدید انتخاب شد",
      description: `عرض جغرافیایی: ${lat.toFixed(6)}, طول جغرافیایی: ${lng.toFixed(6)}`,
    });
  };

  const onSaveContact = (data: any) => {
    // Store phone numbers along with form data
    const contactData = {
      ...data,
      phoneNumbers: phoneNumbers,
      workHours: workHours
    };
    
    // Save to localStorage for demonstration
    localStorage.setItem('contactData', JSON.stringify(contactData));
    
    console.log("Contact data saved:", contactData);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات بخش تماس با موفقیت ذخیره شد",
    });
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Set phone numbers if available
      if (parsedData.phoneNumbers && Array.isArray(parsedData.phoneNumbers)) {
        setPhoneNumbers(parsedData.phoneNumbers);
      }

      // Set work hours if available
      if (parsedData.workHours && Array.isArray(parsedData.workHours)) {
        setWorkHours(parsedData.workHours);
      }
      
      // Set other form values
      const { phoneNumbers, workHours, ...formData } = parsedData;
      contactForm.reset(formData);
    }
  }, []);

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
            
            {/* Multiple Phone Numbers */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addPhoneNumber}
                >
                  <Plus className="h-4 w-4 ml-1" />
                  افزودن شماره
                </Button>
                <FormLabel className="block">شماره های تماس</FormLabel>
              </div>
              
              {phoneNumbers.map((phone, index) => (
                <div key={phone.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <Input
                      value={phone.value}
                      onChange={(e) => handlePhoneChange(phone.id, e.target.value)}
                      className="text-right"
                      placeholder="شماره تماس"
                    />
                  </div>
                  <div className="col-span-5">
                    <Select
                      value={phone.type}
                      onValueChange={(value: 'call' | 'whatsapp' | 'both') => handlePhoneTypeChange(phone.id, value)}
                    >
                      <SelectTrigger className="w-full text-right">
                        <SelectValue placeholder="نوع شماره" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call" className="flex items-center text-right">
                          <div className="flex items-center w-full justify-end">
                            <span>تماس تلفنی</span>
                            <Phone className="h-4 w-4 ml-2 text-accent" />
                          </div>
                        </SelectItem>
                        <SelectItem value="whatsapp" className="flex items-center text-right">
                          <div className="flex items-center w-full justify-end">
                            <span>واتساپ</span>
                            <MessageSquare className="h-4 w-4 ml-2 text-accent" />
                          </div>
                        </SelectItem>
                        <SelectItem value="both" className="flex items-center text-right">
                          <div className="flex items-center w-full justify-end">
                            <span>هر دو</span>
                            <div className="flex ml-2">
                              <MessageSquare className="h-4 w-4 text-accent" />
                              <Phone className="h-4 w-4 text-accent" />
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removePhoneNumber(phone.id)}
                      disabled={phoneNumbers.length === 1 && index === 0}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Work Hours Section */}
            <div className="space-y-3 pt-4 pb-2">
              <div className="flex justify-between items-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addWorkHours}
                >
                  <Plus className="h-4 w-4 ml-1" />
                  افزودن ساعت کاری
                </Button>
                <FormLabel className="block">ساعات کاری</FormLabel>
              </div>
              
              {workHours.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <Input
                      value={item.days}
                      onChange={(e) => handleWorkHoursChange(index, 'days', e.target.value)}
                      className="text-right"
                      placeholder="روزها"
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      value={item.hours}
                      onChange={(e) => handleWorkHoursChange(index, 'hours', e.target.value)}
                      className="text-right"
                      placeholder="ساعات"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeWorkHours(index)}
                      disabled={workHours.length === 1 && index === 0}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
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
            
            {/* Map Location Section */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-lg mb-4 text-right">موقعیت مکانی روی نقشه</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

              <div className="bg-accent/10 p-3 rounded-md mt-2 mb-4">
                <div className="flex items-center text-sm text-accent mb-2">
                  <MousePointer className="h-4 w-4 ml-2" />
                  <span className="font-semibold">انتخاب موقعیت با کلیک روی نقشه:</span>
                </div>
                <div className="flex items-start space-x-2 mb-2">
                  <div className="bg-white shadow-sm rounded px-2 py-1 flex items-center ml-2">
                    <Crosshair className="h-3 w-3 text-red-500 ml-1" />
                    <span className="text-xs">نشانگر محل کلیک</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 pr-6">
                    برای انتخاب موقعیت جدید، مستقیماً روی نقشه زیر کلیک کنید. نشانگر قرمز رنگ محل انتخاب شما را نمایش می‌دهد و مختصات به صورت خودکار در فرم بالا به‌روزرسانی می‌شوند.
                  </p>
                </div>
              </div>

              <div className="w-full mb-6">
                <Map 
                  location={{
                    latitude: parseFloat(contactForm.watch('latitude')),
                    longitude: parseFloat(contactForm.watch('longitude')), 
                    name: contactForm.watch('locationName')
                  }}
                  interactive={true}
                  onLocationChange={handleLocationChange}
                />
              </div>
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
