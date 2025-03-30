
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Save, MapPin, MousePointer, Crosshair } from "lucide-react";
import Map from '@/components/Map';

const EditMap = () => {
  const { toast } = useToast();
  
  // Map form
  const mapForm = useForm({
    defaultValues: {
      locationName: "میدان آزادی",
      latitude: 35.699450,
      longitude: 51.335952,
    }
  });

  const handleLocationChange = (lat: number, lng: number) => {
    // Update form values with new coordinates
    mapForm.setValue('latitude', parseFloat(lat.toFixed(6)));
    mapForm.setValue('longitude', parseFloat(lng.toFixed(6)));
    
    // Show success toast
    toast({
      title: "موقعیت جدید انتخاب شد",
      description: `عرض جغرافیایی: ${lat.toFixed(6)}, طول جغرافیایی: ${lng.toFixed(6)}`,
    });
  };

  const onSaveMapLocation = (data: any) => {
    console.log("Map location data saved:", data);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات موقعیت مکانی با موفقیت ذخیره شد",
    });
  };

  return (
    <Card className="rtl">
      <CardHeader>
        <CardTitle className="text-right">موقعیت مکانی</CardTitle>
        <CardDescription className="text-right">اطلاعات موقعیت مکانی روی نقشه را ویرایش کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...mapForm}>
          <form onSubmit={mapForm.handleSubmit(onSaveMapLocation)} className="space-y-4">
            <FormField
              control={mapForm.control}
              name="locationName"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>نام موقعیت</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-right" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={mapForm.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>عرض جغرافیایی</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.000001" className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={mapForm.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>طول جغرافیایی</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.000001" className="text-right" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-accent/10 p-3 rounded-md mt-2">
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

            <div className="mt-4">
              <p className="text-right text-sm text-muted-foreground mb-2">پیش‌نمایش نقشه:</p>
              <div className="w-full flex justify-center items-center">
                <Map 
                  location={{
                    latitude: mapForm.watch('latitude'),
                    longitude: mapForm.watch('longitude'),
                    name: mapForm.watch('locationName')
                  }}
                  interactive={true}
                  onLocationChange={handleLocationChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button type="submit">
                <Save className="ml-2 h-4 w-4" />
                ذخیره تغییرات
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditMap;
